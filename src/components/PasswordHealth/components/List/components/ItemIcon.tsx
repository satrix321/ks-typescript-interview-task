type ItemIconProps = {
  title: string;
};

const ItemIcon = ({ title }: ItemIconProps) => (
  <div className="item-icon">{title.substring(0, 2)}</div>
);

export default ItemIcon;
