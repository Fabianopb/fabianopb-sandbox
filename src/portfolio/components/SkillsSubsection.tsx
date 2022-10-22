import { Clear, Add, Edit } from '@mui/icons-material';
import { TextField, Button, colors, IconButton } from '@mui/material';
import { useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { isAdminAtom } from '../atoms';
import useSkillsManagement from '../hooks/useSkillsManagement';
import { Skill } from '../types';

type FormValues = {
  skills: { id: string; name: string; value: string }[];
};

type Props = {
  skills: Skill[];
  onSubmitSuccess: () => void;
};

const SkillsContainer = styled.div`
  width: 600px;
  margin: auto;
`;

const SkillsHeader = styled.div`
  display: flex;
  font-weight: bold;
`;

const EditIconButton = styled(IconButton)`
  margin-left: 16px;
`;

const SkillLevel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  color: ${colors.grey[600]};
`;

const SkillBar = styled.div<{ value: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 8px;
  width: 100%;
  background-color: ${colors.blueGrey[100]};
  height: 24px;
  border-radius: 4px;
  ::after {
    position: absolute;
    display: block;
    content: '';
    background-color: ${colors.teal[900]};
    height: 100%;
    width: ${({ value }) => `${value}%`};
    left: 0;
    top: 0;
    border-radius: 4px;
    transition: width 1000ms ease-in-out;
  }
`;

const SkillBarValue = styled.div`
  position: relative;
  color: white;
  z-index: 1;
`;

const SkillFormRow = styled.div`
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

const SkillFormActions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SkillsSubsection = ({ skills, onSubmitSuccess }: Props) => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);
  const [isAdmin] = useAtom(isAdminAtom);

  const { skillsMutation, isEditing, setIsEditing } = useSkillsManagement(skills, 'skill', onSubmitSuccess);

  const defaultValues = useMemo(
    () => ({ skills: skills.map((skill) => ({ id: skill._id, name: skill.name, value: skill.value.toString() })) }),
    [skills]
  );

  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ control, name: 'skills' });

  return (
    <SkillsContainer onMouseOver={() => (!hasHoveredSkills ? setHasHoveredSkills(true) : undefined)}>
      <SkillsHeader>
        <SkillLevel>BEGINNER</SkillLevel>
        <SkillLevel>PROFICIENT</SkillLevel>
        <SkillLevel>EXPERT</SkillLevel>
        {isAdmin && (
          <EditIconButton color="primary" size="small" onClick={() => setIsEditing((prev) => !prev)}>
            <Edit />
          </EditIconButton>
        )}
      </SkillsHeader>
      {!isEditing &&
        skills.map((skill) => (
          <SkillBar key={skill.name} value={hasHoveredSkills ? skill.value : 0}>
            <SkillBarValue>{skill.name}</SkillBarValue>
            <SkillBarValue>{skill.value}%</SkillBarValue>
          </SkillBar>
        ))}
      {isAdmin && isEditing && (
        <form>
          {fields.map((field, index) => (
            <SkillFormRow key={field.id}>
              <StyledNameInput {...register(`skills.${index}.name`)} size="small" disabled={skillsMutation.isLoading} />
              <StyledValueInput
                {...register(`skills.${index}.value`)}
                size="small"
                disabled={skillsMutation.isLoading}
              />
              <ClearIconButton color="error" size="small" onClick={() => remove(index)}>
                <Clear />
              </ClearIconButton>
            </SkillFormRow>
          ))}
          <Button
            style={{ marginTop: 8 }}
            size="small"
            variant="text"
            color="primary"
            endIcon={<Add />}
            onClick={() => append({ id: new Date().valueOf().toString(), name: '', value: '' })}
            disabled={skillsMutation.isLoading}
          >
            Add field
          </Button>
          <SkillFormActions>
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
              onClick={handleSubmit((data) => skillsMutation.mutate(data.skills))}
              disabled={skillsMutation.isLoading}
            >
              Save
            </Button>
          </SkillFormActions>
        </form>
      )}
    </SkillsContainer>
  );
};

export default SkillsSubsection;
