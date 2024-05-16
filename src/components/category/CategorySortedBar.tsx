import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type HandleSortedType = {
  selectedValue: string;
  handleSortProduct: (cate: string) => void;
};

const CategorySortedBar = ({
  selectedValue,
  handleSortProduct,
}: HandleSortedType) => {
  //TODO: 상품 조회 후 뒤로가기 해도 해당 정렬 조건으로 유지될 수 있도록 수정하기
  return (
    <Select defaultValue={selectedValue} onValueChange={handleSortProduct}>
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
