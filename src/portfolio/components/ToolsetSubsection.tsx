import { Add, Clear, Edit } from '@mui/icons-material';
import { Button, Rating, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ResponsiveContainer, PieChart, Pie, Sector } from 'recharts';
import styled from 'styled-components';
import { addSkills, deleteSkill, editSkill } from '../../api';
import { isAdminAtom } from '../atoms';
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
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #555;
`;

const EditIcon = styled(Edit)`
  margin-left: 16px;
  width: 20px;
  fill: #17293a;
  cursor: pointer;
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
  font-size: 12px;
  color: #555;
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

const ClearIcon = styled(Clear)`
  margin-left: 8px;
  width: 16px;
  fill: #9b0000;
  cursor: pointer;
`;

const FormActions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ToolsetSubsection = ({ toolset, onSubmitSuccess }: Props) => {
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [isAdmin] = useAtom(isAdminAtom);

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false);
    }
  }, [isAdmin]);

  const defaultValues = useMemo(
    () => ({ toolset: toolset.map((tool) => ({ id: tool._id, name: tool.name, value: tool.value.toString() })) }),
    [toolset]
  );

  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ control, name: 'toolset' });

  const { mutate, isLoading } = useMutation(
    async (data: FormValues) => {
      const originalToolIds = toolset.map((tool) => tool._id);
      const formToolIds = data.toolset.map((dataTool) => dataTool.id);
      const addedTools = data.toolset.filter((dataTool) => !originalToolIds.includes(dataTool.id));
      const deletedTools = toolset.filter((tool) => !formToolIds.includes(tool._id));
      const editedTools = data.toolset.reduce<FormValues['toolset']>((acc, curr) => {
        const originalTool = toolset.find((tool) => tool._id === curr.id);
        if (originalTool && (originalTool.name !== curr.name || originalTool?.value !== Number(curr.value))) {
          return [...acc, curr];
        }
        return acc;
      }, []);
      console.log('addedTools', addedTools);
      console.log('deletedTools', deletedTools);
      console.log('editedTools', editedTools);
      if (addedTools.length > 0) {
        const payload = addedTools.map(({ name, value }) => ({ name, value: Number(value), type: 'tool' as const }));
        await addSkills(payload);
      }
      if (deletedTools.length > 0) {
        for (const skill of deletedTools) {
          await deleteSkill(skill._id);
        }
      }
      if (editedTools.length > 0) {
        for (const skill of editedTools) {
          const { id: skillId, name, value } = skill;
          await editSkill(skillId, { name, value: Number(value), type: 'tool' });
        }
      }
    },
    {
      onSuccess: () => {
        setIsEditing(false);
        onSubmitSuccess();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  return (
    <ToolsetContainer>
      <Header>
        <Subtitle>Toolset</Subtitle>
        {isAdmin && <EditIcon onClick={() => setIsEditing((prev) => !prev)} />}
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
                        fill="#00998a"
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
                fill="#00d6c1"
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
              <StyledNameInput {...register(`toolset.${index}.name`)} size="small" disabled={isLoading} />
              <StyledValueInput {...register(`toolset.${index}.value`)} size="small" disabled={isLoading} />
              <ClearIcon onClick={() => remove(index)} />
            </FormRow>
          ))}
          <Button
            style={{ marginTop: 8 }}
            size="small"
            variant="text"
            endIcon={<Add />}
            onClick={() => append({ id: new Date().valueOf().toString(), name: '', value: '' })}
            disabled={isLoading}
          >
            Add field
          </Button>
          <FormActions>
            <Button size="small" variant="outlined" onClick={() => setIsEditing(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              size="small"
              variant="contained"
              type="submit"
              onClick={handleSubmit((data) => mutate(data))}
              disabled={isLoading}
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
