package com.idea.demoapp.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.idea.demoapp.model.TextItem;

public interface TextItemRepository extends JpaRepository<TextItem, Long> {
    List<TextItem> findByTextContainingIgnoreCase(String query);
}

