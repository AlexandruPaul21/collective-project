import categories from "@/utils/filterConstants";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const FilterSidebar: React.FC = () => {
  return (
    <div className="mt-1 flex min-w-[250px] flex-col items-center justify-start overflow-hidden">
      <div className="flex min-w-[250px] flex-col rounded-lg border-[1px] border-gray-200 bg-white">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-md mb-2 ml-5 mt-[30px] font-semibold">
              {category.name}
            </h3>
            <ul>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mt-3">
                  <Checkbox
                    id={`${category.name}-${item}`}
                    className="ml-5 mr-2"
                    onChange={() => {}}
                  />
                  <label
                    htmlFor={`${category.name}-${item}`}
                    className="text-sm"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Button className="my-10 ml-auto mr-auto">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
