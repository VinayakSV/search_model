package com.idea.demoapp.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.idea.demoapp.model.SelectedData;
import com.idea.demoapp.model.TextItem;
import com.idea.demoapp.repo.TextItemRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TextItemController {
	
	private static final Logger LOG = LogManager.getLogger(TextItemController.class);
	
    private final TextItemRepository textItemRepository;

    @Autowired
    public TextItemController(TextItemRepository textItemRepository) {
        this.textItemRepository = textItemRepository;
    }

    @GetMapping("/text-items")
    public List<TextItem> searchByText(@RequestParam String query) {
        return textItemRepository.findByTextContainingIgnoreCase(query);
    }
    
    @PostMapping("/save-selected-item")
    public String saveText(@RequestBody SelectedData selectedModel) {
    	LOG.info("The selected data is {}",selectedModel.getSelectedData());
    	return selectedModel.getSelectedData() + " saved successfully!";
    }
}

