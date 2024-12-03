import { Helmet } from "react-helmet";

const SEOMetadata = ({
  primaryKeyword = "Project Management",
  secondaryKeyword = "Task Organizer",
  projectName = "",
  brandName = "Project Manager",
  description = "",
  isProjectPage = false,
}) => {
  // Construct title based on whether it's a project page or landing page
  const title = isProjectPage
    ? `${projectName} Management - Task Dashboard | ${brandName}`
    : `${primaryKeyword} - ${secondaryKeyword} | ${brandName}`;

  // Construct description based on page type
  const metaDescription = isProjectPage
    ? `Manage tasks and track progress for ${projectName}. Organize workflows and collaborate efficiently.`
    : "Streamline your workflow with our project management tool. Add projects, assign tasks, and track progress effortlessly.";

  // Construct keywords based on page type
  const keywords = isProjectPage
    ? `${projectName}, Project Management, Task Management, Project Dashboard, ${primaryKeyword}, ${secondaryKeyword}`
    : "Project Management, Task Management, Productivity, Organize Projects, Add Tasks, Add Projects";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description || metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || metaDescription}
      />
    </Helmet>
  );
};

export default SEOMetadata;
