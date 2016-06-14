## Media Files

### Converting Sound Files

Our book recommended having at least two versions of a sound file when using them as assets in a game. To convert one sound file from another is an easy task when using your server.


### Converting Image Files



##Image Magick

#### Original Image
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super-mushroom.png)

- Replace the "white" color with "red"
```bash
convert super-mushroom.png -fuzz 25% -fill red -opaque white super-mushroom-1.png
```
![](http://104.131.149.230/Mwsu-Mobile-Gaming/Example_code/Program_1_Starter/assets/super-mushroom-1.png)

convert super-mushroom-2.png -colorspace HSB -separate image_mask.png

(creates image_mask-0.png,image_mask-1.png,image_mask-2.png) 

convert super-mushroom-2.png -alpha Off  image_mask-1.png -compose CopyOpacity -composite PNG32:super-mushroom-2-alpha.png

convert -trim super-mushroom-1.png super-mushroom-2.png