import { Add, Clear, Edit } from '@mui/icons-material';
import { Button, colors, IconButton, Rating, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import styled from 'styled-components';
import { isAdminAtom } from '../atoms';
import useSkillsManagement from '../hooks/useSkillsManagement';
import { Skill } from '../types';

type FormValues = {
  toolset: { id: string; name: string; value: string }[];
};

type Props = {
  toolset: Skill[];
  onSubmitSuccess: () => void;
};

const ToolsetContainer = styled.div`
  width: 600px;
  margin: auto;
`;

const Header = styled.div`
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${colors.grey[600]};
`;

const EditIconButton = styled(IconButton)`
  margin-left: 16px;
`;

const ChartContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RatingLabel = styled.div`
  font-size: 0.75rem;
  color: ${colors.grey[600]};
`;

const FormRow = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`;

const StyledNameInput = styled(TextField)`
  flex: 3;
`;

const StyledValueInput = styled(TextField)`
  margin-left: 8px;
  flex: 1;
`;

const ClearIconButton = styled(IconButton)`
  margin-left: 8px;
`;

const FormActions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ToolsetSubsection = ({ toolset, onSubmitSuccess }: Props) => {
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [isAdmin] = useAtom(isAdminAtom);

  const { skillsMutation, isEditing, setIsEditing } = useSkillsManagement(toolset, 'tool', onSubmitSuccess);

  const defaultValues = useMemo(
    () => ({ toolset: toolset.map((tool) => ({ id: tool._id, name: tool.name, value: tool.value.toString() })) }),
    [toolset]
  );

  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ control, name: 'toolset' });

  return (
    <ToolsetContainer>
      <Header>
        <Subtitle>Toolset</Subtitle>
        {isAdmin && (
          <EditIconButton color="primary" size="small" onClick={() => setIsEditing((prev) => !prev)}>
            <Edit />
          </EditIconButton>
        )}
      </Header>
      {!isEditing && toolset.length > 0 && (
        <ChartContainer>
          <RatingContainer>
            <RatingLabel>{toolset[activePieIndex].name}</RatingLabel>
            <Rating value={toolset[activePieIndex].value / 20} precision={0.5} size="small" />
          </RatingContainer>
          <ResponsiveContainer height={400}>
            <PieChart>
              <Pie
                activeIndex={activePieIndex}
                activeShape={(props: any) => {
                  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle } = props;
                  return (
                    <>
                      <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={colors.teal.A200}
                      />
                    </>
                  );
                }}
                data={toolset}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                label={(props: any) => {
                  const RADIAN = Math.PI / 180;
                  const { cx, cy, midAngle, outerRadius, fill, name } = props;
                  const sin = Math.sin(-RADIAN * midAngle);
                  const cos = Math.cos(-RADIAN * midAngle);
                  const sx = cx + (outerRadius + 10) * cos;
                  const sy = cy + (outerRadius + 10) * sin;
                  const mx = cx + (outerRadius + 30) * cos;
                  const my = cy + (outerRadius + 30) * sin;
                  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
                  const ey = my;
                  const textAnchor = cos >= 0 ? 'start' : 'end';
                  return (
                    <g>
                      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#555">
                        {name}
                      </text>
                    </g>
                  );
                }}
                fill={colors.teal.A700}
                onMouseEnter={(_, index) => setActivePieIndex(index)}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      )}
      {isAdmin && isEditing && (
        <form>
          {fields.map((field, index) => (
            <FormRow key={field.id}>
              <StyledNameInput
                {...register(`toolset.${index}.name`)}
                size="small"
                disabled={skillsMutation.isLoading}
              />
              <StyledValueInput
                {...register(`toolset.${index}.value`)}
                size="small"
                disabled={skillsMutation.isLoading}
              />
              <ClearIconButton color="error" size="small" onClick={() => remove(index)}>
                <Clear />
              </ClearIconButton>
            </FormRow>
          ))}
          <Button
            style={{ marginTop: 8 }}
            size="small"
            variant="text"
            endIcon={<Add />}
            onClick={() => append({ id: new Date().valueOf().toString(), name: '', value: '' })}
            disabled={skillsMutation.isLoading}
          >
            Add field
          </Button>
          <FormActions>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
              disabled={skillsMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              size="small"
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit((data) => skillsMutation.mutate(data.toolset))}
              disabled={skillsMutation.isLoading}
            >
              Save
            </Button>
          </FormActions>
        </form>
      )}
    </ToolsetContainer>
  );
};

export default ToolsetSubsection;
