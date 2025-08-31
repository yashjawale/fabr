#!/bin/bash

# Add proper titles to API documentation files
find website/src/content/docs/docs/developer/api -name "*.md" -type f | while read file; do
    if ! grep -q "^title:" "$file"; then
        # Extract module/function name from the heading
        title=$(grep "^# " "$file" | head -1 | sed 's/^# //')
        
        if [ -n "$title" ]; then
            # Create temp file with title added to frontmatter
            awk '
                /^---$/ && NR==1 {print; next}
                /^---$/ && !title_added {
                    print "title: \"'"$title"'\""
                    title_added=1
                }
                {print}
            ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
        fi
    fi
done
