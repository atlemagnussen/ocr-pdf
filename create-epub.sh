rm vesica-essential.epub

# add mimetype 1st
zip -0 -X vesica-essential.epub mimetype

# add the rest
zip -9 -X -r -u vesica-essential.epub *

zip -d vesica-essential.epub create-epub.sh