# Lazy Loading Images


##### Problem
Only load an image when it is within the viewport which means that the actual request to the image will only be done if the image is in the viewport. The goal is to conserve http requests.


##### Solution
```
lazyload(imgs);
```


##### Scope
Images only.


##### Given
- Target images has a class of `lazy-img`.
- Image source (`src`) is set in a data attribute instead (`data-src`).

```
<img class="lazy-img" data-src="/path/to/image.jpg">
```

##### Result
- Target images will have an additional class called `loaded`.
- Data attribute (`data-src`) will be remove from the target images.


**PS**
The repo is the demo itself.

