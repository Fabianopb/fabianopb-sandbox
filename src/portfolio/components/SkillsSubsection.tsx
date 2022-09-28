import { Clear, Add, Edit } from '@mui/icons-material';
import { TextField, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addSkills, deleteSkill, editSkill } from '../../api';
import { isAdminAtom } from '../atoms';
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

const EditIcon = styled(Edit)`
  margin-left: 16px;
  width: 20px;
  fill: #17293a;
  cursor: pointer;
`;

const SkillLevel = styled.div`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #555;
`;

const SkillBar = styled.div<{ value: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 8px;
  width: 100%;
  background-color: #d1d0d7;
  height: 24px;
  border-radius: 4px;
  ::after {
    position: absolute;
    display: block;
    content: '';
    background-color: #17293a;
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
  color: #fff;
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

const ClearIcon = styled(Clear)`
  margin-left: 8px;
  width: 16px;
  fill: #9b0000;
  cursor: pointer;
`;

const SkillFormActions = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SkillsSubsection = ({ skills, onSubmitSuccess }: Props) => {
  const [hasHoveredSkills, setHasHoveredSkills] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);

  const [isAdmin] = useAtom(isAdminAtom);

  useEffect(() => {
    if (!isAdmin) {
      setIsEditingSkills(false);
    }
  }, [isAdmin]);

  const defaultValues = useMemo(
    () => ({ skills: skills.map((skill) => ({ id: skill._id, name: skill.name, value: skill.value.toString() })) }),
    [skills]
  );

  const { control, register, handleSubmit } = useForm<FormValues>({ defaultValues });
  const { fields, remove, append } = useFieldArray({ control, name: 'skills' });

  const { mutate, isLoading } = useMutation(
    async (data: FormValues) => {
      const originalSkillIds = skills.map((skill) => skill._id);
      const formSkillIds = data.skills.map((dataSkill) => dataSkill.id);
      const addedSkills = data.skills.filter((dataSkill) => !originalSkillIds.includes(dataSkill.id));
      const deletedSkills = skills.filter((skill) => !formSkillIds.includes(skill._id));
      const editedSkills = data.skills.reduce<FormValues['skills']>((acc, curr) => {
        const originalSkill = skills.find((skill) => skill._id === curr.id);
        if (originalSkill && (originalSkill.name !== curr.name || originalSkill?.value !== Number(curr.value))) {
          return [...acc, curr];
        }
        return acc;
      }, []);
      if (addedSkills.length > 0) {
        const payload = addedSkills.map(({ name, value }) => ({ name, value: Number(value), type: 'skill' as const }));
        await addSkills(payload);
      }
      if (deletedSkills.length > 0) {
        for (const skill of deletedSkills) {
          await deleteSkill(skill._id);
        }
      }
      if (editedSkills.length > 0) {
        for (const skill of editedSkills) {
          const { id: skillId, name, value } = skill;
          await editSkill(skillId, { name, value: Number(value), type: 'skill' });
        }
      }
    },
    {
      onSuccess: () => {
        setIsEditingSkills(false);
        onSubmitSuccess();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  return (
    <SkillsContainer onMouseOver={() => (!hasHoveredSkills ? setHasHoveredSkills(true) : undefined)}>
      <SkillsHeader>
        <SkillLevel>BEGINNER</SkillLevel>
        <SkillLevel>PROFICIENT</SkillLevel>
        <SkillLevel>EXPERT</SkillLevel>
        {isAdmin && <EditIcon onClick={() => setIsEditingSkills((prev) => !prev)} />}
      </SkillsHeader>
      {!isEditingSkills &&
        skills.map((skill) => (
          <SkillBar key={skill.name} value={hasHoveredSkills ? skill.value : 0}>
            <SkillBarValue>{skill.name}</SkillBarValue>
            <SkillBarValue>{skill.value}%</SkillBarValue>
          </SkillBar>
        ))}
      {isAdmin && isEditingSkills && (
        <form>
          {fields.map((field, index) => (
            <SkillFormRow key={field.id}>
              <StyledNameInput {...register(`skills.${index}.name`)} size="small" disabled={isLoading} />
              <StyledValueInput {...register(`skills.${index}.value`)} size="small" disabled={isLoading} />
              <ClearIcon onClick={() => remove(index)} />
            </SkillFormRow>
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
          <SkillFormActions>
            <Button size="small" variant="outlined" onClick={() => setIsEditingSkills(false)} disabled={isLoading}>
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
          </SkillFormActions>
        </form>
      )}
    </SkillsContainer>
  );
};

export default SkillsSubsection;
