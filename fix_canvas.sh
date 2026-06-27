#!/bin/bash

# Fix matrix-rain.component.ts
sed -i '/<canvas/,/\/>/s/\/>/><\/canvas>/' web/src/app/components/matrix-rain.component.ts

# Fix tech-canvas.component.ts  
sed -i '/<canvas/,/\/>/s/\/>/><\/canvas>/' web/src/app/components/tech-canvas.component.ts
sed -i '/<span[^>]*\/>/s/\/>/><\/span>/g' web/src/app/components/tech-canvas.component.ts

echo "✅ Canvas tags fixed"
