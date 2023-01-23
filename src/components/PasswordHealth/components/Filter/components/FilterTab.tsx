import { useHistory } from "react-router-dom";

type FilterTabProps = {
  title: string;
  count: number;
  path: string;
};

const FilterTab = ({ title, count, path }: FilterTabProps) => {
  const { push } = useHistory();

  return (
    <div className="filter-tab" onClick={() => push(path)}>
      {`${title} (${count})`}
    </div>
  );
};

export default FilterTab;
