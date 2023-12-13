import { Accessor, Setter } from "solid-js"
import { Categories, CategoryId } from "@app/constants"
import { FilterTab } from "@app/components";
import { Message } from "@app/i18n/components";

export type CategoryFilterProps = {
  activeCategoryFilter: Accessor<CategoryId | null>;
  setActiveCategoryFilter: Setter<CategoryId | null>;
}

export function CategoryFilter({
  activeCategoryFilter,
  setActiveCategoryFilter
}: CategoryFilterProps) {
  return (
    <div class="overflow-x-auto mx-[-1.2rem] px-5 mb-3">
      <div class="flex gap-2 pb-1 w-fit">
        <FilterTab
          id={null}
          onSwitch={setActiveCategoryFilter}
          active={() => activeCategoryFilter() === null}
        >
          <Message>Category.all</Message>
        </FilterTab>
          {Object.keys(Categories).map((category) => (
            <FilterTab
            id={category}
            onSwitch={setActiveCategoryFilter}
            active={() => activeCategoryFilter() === category}
          >
            <Message>{`Category.${category}`}</Message>
          </FilterTab>
        ))}
      </div>
    </div>
  );
}
