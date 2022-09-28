import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addSkills, deleteSkill, editSkill } from '../../api';
import { isAdminAtom } from '../atoms';
import { Skill } from '../types';

type FormData = { id: string; name: string; value: string }[];

const useSkillsManagement = (originalSkills: Skill[], type: 'skill' | 'tool', successCallback: () => void) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isAdmin] = useAtom(isAdminAtom);

  useEffect(() => {
    if (!isAdmin) {
      setIsEditing(false);
    }
  }, [isAdmin]);

  const skillsMutation = useMutation(
    async (data: FormData) => {
      const originalSkillIds = originalSkills.map((skill) => skill._id);
      const formSkillIds = data.map((dataSkill) => dataSkill.id);
      const addedSkills = data.filter((dataSkill) => !originalSkillIds.includes(dataSkill.id));
      const deletedSkills = originalSkills.filter((skill) => !formSkillIds.includes(skill._id));
      const editedSkills = data.reduce<FormData>((acc, curr) => {
        const originalTool = originalSkills.find((tool) => tool._id === curr.id);
        if (originalTool && (originalTool.name !== curr.name || originalTool?.value !== Number(curr.value))) {
          return [...acc, curr];
        }
        return acc;
      }, []);
      if (addedSkills.length > 0) {
        const payload = addedSkills.map(({ name, value }) => ({ name, value: Number(value), type }));
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
          await editSkill(skillId, { name, value: Number(value), type });
        }
      }
    },
    {
      onSuccess: () => {
        setIsEditing(false);
        successCallback();
      },
      onError: (error?: any) => {
        const message = error?.response?.data?.message || error?.message;
        toast(message || 'Unkown error!', { type: 'error' });
      },
    }
  );

  return { skillsMutation, isEditing, setIsEditing };
};

export default useSkillsManagement;
