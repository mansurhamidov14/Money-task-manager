export function NewItemButton() {
  return (
    <div class="flex items-center justify-center">
      <button type="button" class="new-item-btn">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
        </svg>
        <span class="sr-only">New item</span>
      </button>
    </div>
  )
}