import React from "react";

const mockMediaRenderer = jest.fn(({ src, type, alt, className }) => (
  <div
    data-testid="media-renderer"
    data-src={src}
    data-type={type}
    data-alt={alt}
    className={className}
  >
    Mocked Media
  </div>
));

export default mockMediaRenderer;
