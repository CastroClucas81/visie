type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return <h2 className="text-danger mb-3">{title}</h2>;
};

export default PageTitle;
