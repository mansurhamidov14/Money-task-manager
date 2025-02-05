import { Accessor, Setter } from "solid-js";
import { FilterTab } from "@app/components";
import { Message } from "@app/i18n";
import { categoryService } from "@app/services";
import { CategoryId } from "@app/entities";

export type CategoryFilterProps = {
  filter: Accessor<CategoryId | null>;
  setFilter: Setter<CategoryId | null>;
}

export function CategoryFilter({
  filter,
  setFilter
}: CategoryFilterProps) {
  return (
    <div class="overflow-x-auto -mx-3 px-2 mb-3 pb-3">
      <div class="flex gap-2 w-fit">
        <FilterTab
          id={null}
          onSwitch={setFilter}
          active={filter() === null}
        >
          <Message>Category.all</Message>
        </FilterTab>
          {categoryService.ids.map((category) => (
            <FilterTab
              id={category}
              onSwitch={setFilter}
              active={filter() === category}
            >
            <Message>{`Category.${category}`}</Message>
          </FilterTab>
        ))}
      </div>
    </div>
  );
}
