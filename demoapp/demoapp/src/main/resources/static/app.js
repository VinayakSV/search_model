document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const autocompleteDropdown = document.getElementById("autocompleteDropdown");

  searchInput.addEventListener("input", async function (event) {
    const searchQuery = event.target.value.trim();

    if (searchQuery === "") {
      autocompleteDropdown.innerHTML = ""; // Clear dropdown if search query is empty
      return;
    }

    try {
      const response = await fetch(`http://localhost:9090/api/text-items?query=${searchQuery}`);
      const data = await response.json();
      const optionsHTML = data.map((item) => `<li><span>${item.text}</span></li>`).join("");
      autocompleteDropdown.innerHTML = optionsHTML;
    } catch (error) {
      console.error("Error fetching data:", error);
      autocompleteDropdown.innerHTML = "";
    }
    
    toggleClearButton(); // Toggle clear button based on the input value
  });

  let selectedIndex = -1; // Keep track of the selected index

  searchInput.addEventListener("keydown", function (event) {
	    const items = autocompleteDropdown.getElementsByTagName("li");
	    const numItems = items.length;

	    if (event.key === "ArrowDown") {
	      event.preventDefault(); // Prevent default scrolling behavior

	      if (numItems > 0) {
	        // Remove the current highlight
	        if (selectedIndex >= 0 && selectedIndex < numItems) {
	          items[selectedIndex].classList.remove("highlight");
	        }

	        // Move to the next item or loop back to the first item
	        selectedIndex = (selectedIndex + 1) % numItems;

	        // Highlight the selected item
	        items[selectedIndex].classList.add("highlight");

	        // Set the input value to the selected item's text
	        searchInput.value = items[selectedIndex].innerText;
	      }
	    } else if (event.key === "ArrowUp") {
	      event.preventDefault(); // Prevent default scrolling behavior

	      if (numItems > 0) {
	        // Remove the current highlight
	        if (selectedIndex >= 0 && selectedIndex < numItems) {
	          items[selectedIndex].classList.remove("highlight");
	        }

	        // Move to the previous item or loop to the last item
	        selectedIndex = (selectedIndex - 1 + numItems) % numItems;

	        // Highlight the selected item
	        items[selectedIndex].classList.add("highlight");

	        // Set the input value to the selected item's text
	        searchInput.value = items[selectedIndex].innerText;
	      }
	    }
	  });

	  searchInput.addEventListener("keyup", function (event) {
	    if (event.key === "Enter") {
	      const items = autocompleteDropdown.getElementsByTagName("li");
	      const numItems = items.length;

	      if (numItems > 0 && selectedIndex >= 0 && selectedIndex < numItems) {
	        // Simulate click event on the selected item
	        items[selectedIndex].click();
	      }
	    }
	  });
  
  // Event listener for dropdown item selection
  autocompleteDropdown.addEventListener("click", function (event) {
    const selectedText = event.target.textContent.trim();
    setSearchInputValue(selectedText); // Set the selected text in the search input
    closeDropdown(); // Close the dropdown after selection
    sendSelectedTextToBackend(selectedText); // Function to send selected text to the backend
  });

  // Function to set the selected text in the search input
  function setSearchInputValue(text) {
    searchInput.value = text;
  }

  // Function to close the dropdown
  function closeDropdown() {
    autocompleteDropdown.innerHTML = ""; // Clear the dropdown items
  }

  // Function to send selected text to the backend
  function sendSelectedTextToBackend(text) {
    // Replace the URL and method with your backend API endpoint and request method (POST, PUT, etc.)
    fetch("http://localhost:9090/api/save-selected-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedModel: text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Selected item sent to backend:", data);
      })
      .catch((error) => {
        console.error("Error sending selected item:", error);
      });
  }
  
	  const clearButton = document.getElementById("clearButton");
	
	  // Other code for autocomplete functionality...
	
	  // Show or hide the clear button based on the search input value
	  function toggleClearButton() {
	      clearButton.style.visibility = searchInput.value ? "visible" : "hidden";
	  }
	  
	//Clear the search input when the clear button is clicked
	  clearButton.addEventListener("click", function () {
	      searchInput.value = "";
	      toggleClearButton(); // Hide the clear button after clearing the input
	      closeDropdown();
	  });
	  
	// Show or hide the clear button when the page loads or input element gains focus
	  window.addEventListener("load", toggleClearButton);
	  searchInput.addEventListener("focus", toggleClearButton); 
	  searchInput.addEventListener("blur", toggleClearButton);
});
