import categories from "@/utils/filterConstants";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const FilterSidebar: React.FC = () => {
  return (
    <ScrollArea className="flex h-[93vh] flex-col overflow-hidden border-r-2 border-gray-300 bg-zinc-100 md:block md:min-w-[200px] lg:min-w-[250px]">
      <div className="mt-4">
        {categories.map((category, index) => (
          <div key={index}>
            <h3 className="text-md mb-2 ml-3 mt-2 font-semibold">
              {category.name}
            </h3>
            <ul>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Checkbox
                    id={`${category.name}-${item}`}
                    className="ml-3 mr-2"
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
      </div>
      <div className="flex flex-row">
        <Button
          className="mx-auto mt-10 w-[100px] bg-teal-900 hover:bg-teal-700 lg:w-[140px]"
          onClick={() => {}}
        >
          Apply
        </Button>
      </div>
    </ScrollArea>
  );
};

export default FilterSidebar;
