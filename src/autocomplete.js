const autoComplete = () => {
	return `
  <div class="autocomplete">
    <label for="search">Search</label>
    <input type="text" id="search" name="search">
      <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results">
          </div>
        </div>
      </div>
    </div>
  `;
};

export { autoComplete };
