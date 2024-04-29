import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type HandleSortedType = {
  handleSorted: (cate: string) => void;
};

const CategorySortedBar = ({ handleSorted }: HandleSortedType) => {
  return (
    <Select
      defaultValue={"updatedAt"}
      onValueChange={(cate) => handleSorted(cate)}
    >
      <SelectTrigger className="w-full border-gray-500">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="updatedAt">최신 등록 순</SelectItem>
          <SelectItem value="lowerPrice">낮은 가격 순</SelectItem>
          <SelectItem value="upperPrice">높은 가격 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySortedBar;
