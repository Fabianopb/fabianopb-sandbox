import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default ProjectDetails;
