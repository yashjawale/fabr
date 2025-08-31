#!/bin/bash

# Add frontmatter to all .md files in the generated API docs
find website/src/content/docs/developer/generated -name "*.md" -type f | while read file; do
    if ! grep -q "^---" "$file"; then
        # Extract the title from the file and directory path
        filename=$(basename "$file" .md)
        dirname=$(dirname "$file")
        
        if [[ "$dirname" == *"/generated" ]] && [[ "$filename" == "README" ]]; then
            title="API Reference"
        elif [[ "$dirname" == *"/lib/"* ]] && [[ "$filename" == "README" ]]; then
            module=$(basename "$dirname")
            title="$module Module"
        elif [[ "$dirname" == *"/types/"* ]] && [[ "$filename" == "README" ]]; then
            module=$(basename "$dirname")
            title="$module Types"
        elif [[ "$dirname" == *"/functions/"* ]]; then
            title="$filename Function"
        elif [[ "$dirname" == *"/classes/"* ]]; then
            title="$filename Class"
        elif [[ "$dirname" == *"/interfaces/"* ]]; then
            title="$filename Interface"
        elif [[ "$dirname" == *"/types/"* ]]; then
            title="$filename Type"
        else
            title="$filename"
        fi
        
        # Add frontmatter
        echo "---" > temp
        echo "title: $title" >> temp
        echo "description: Auto-generated API documentation" >> temp
        echo "---" >> temp
        echo "" >> temp
        cat "$file" >> temp
        mv temp "$file"
    fi
done
