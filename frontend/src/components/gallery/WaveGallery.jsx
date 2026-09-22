import { useCallback, useEffect, useRef, useState } from "react";
import "./WaveGallery.css";

const WaveGallery = ({ images, onSelect }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const animationRef = useRef(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  const pointerSmoothRef = useRef({
    x: 0,
    y: 0,
  });

  const dimensionsRef = useRef({
    width: 0,
    height: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Keep React state and animation ref synchronized.
   */
  const changeActive = useCallback(
    (index) => {
      if (!images.length) return;

      const next =
        (index + images.length) % images.length;

      activeIndexRef.current = next;
      setActiveIndex(next);
    },
    [images.length]
  );

  /*
   * Cache dimensions.
   * This is intentionally NOT called every frame.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();

      dimensionsRef.current.width = rect.width;
      dimensionsRef.current.height = rect.height;
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  /*
   * Cache card DOM nodes.
   */
  useEffect(() => {
    cardsRef.current = [
      ...containerRef.current?.querySelectorAll(
        ".wave-gallery__card"
      ),
    ];
  }, [images]);

  /*
   * Main animation loop.
   *
   * IMPORTANT:
   * No React state.
   * No DOM queries.
   * No layout reads.
   */
  useEffect(() => {
    if (!images.length) return;

    const cards = cardsRef.current;

    if (!cards.length) return;

    let running = true;

    const animate = () => {
      if (!running) return;

      const { width, height } =
        dimensionsRef.current;

      const pointer = pointerRef.current;
      const smooth = pointerSmoothRef.current;

      /*
       * Smooth pointer interpolation.
       */
      const targetX = pointer.active
        ? pointer.x
        : 0;

      const targetY = pointer.active
        ? pointer.y
        : 0;

      smooth.x +=
        (targetX - smooth.x) * 0.085;

      smooth.y +=
        (targetY - smooth.y) * 0.085;

      const active =
        activeIndexRef.current;

      /*
       * Responsive card spacing.
       */
      const spacing = Math.min(
        width * 0.245,
        300
      );

      const verticalWave = Math.min(
        height * 0.14,
        105
      );

      const half =
        images.length / 2;

      for (let i = 0; i < cards.length; i++) {
        let distance = i - active;

        /*
         * Circular carousel wrapping.
         */
        if (distance > half) {
          distance -= images.length;
        }

        if (distance < -half) {
          distance += images.length;
        }

        const absDistance =
          Math.abs(distance);

        /*
         * Don't spend expensive animation work
         * on cards far outside the viewport.
         */
        if (absDistance > 4) {
          cards[i].style.opacity = "0";
          continue;
        }

        /*
         * Wave shape.
         */
        const wave =
          Math.sin(distance * 0.72) *
          verticalWave;

        /*
         * Cursor influence decreases with distance.
         */
        const influence =
          1 / (absDistance + 1);

        const x =
          distance * spacing +
          smooth.x * 55 * influence;

        const y =
          wave -
          smooth.y * 35 * influence;

        /*
         * Center card is slightly larger.
         */
        const scale =
          1 -
          Math.min(
            absDistance * 0.075,
            0.3
          );

        /*
         * Subtle rotation.
         */
        const rotation =
          distance * -4.5 +
          smooth.x * 3 * influence;

        /*
         * Slight 3D depth.
         */
        const z =
          -absDistance * 80;

        const opacity =
          1 -
          Math.min(
            absDistance * 0.2,
            0.65
          );

        /*
         * GPU-friendly transform.
         */
        cards[i].style.transform =
          `translate3d(
            calc(-50% + ${x}px),
            calc(-50% + ${y}px),
            ${z}px
          )
          rotate(${rotation}deg)
          scale3d(${scale}, ${scale}, 1)`;

        cards[i].style.opacity =
          opacity.toString();
      }

      animationRef.current =
        requestAnimationFrame(animate);
    };

    animationRef.current =
      requestAnimationFrame(animate);

    return () => {
      running = false;

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current
        );
      }
    };
  }, [images.length]);

  /*
   * Pointer movement.
   *
   * We intentionally do NOT use setState here.
   */
  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    const handlePointerMove = (event) => {
      const rect =
        container.getBoundingClientRect();

      pointerRef.current.x =
        (event.clientX - rect.left) /
          rect.width -
        0.5;

      pointerRef.current.y =
        (event.clientY - rect.top) /
          rect.height -
        0.5;

      pointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    container.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    container.addEventListener(
      "pointerleave",
      handlePointerLeave,
      { passive: true }
    );

    return () => {
      container.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      container.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
    };
  }, []);

  /*
   * Wheel navigation.
   */
  useEffect(() => {
    const container =
      containerRef.current;

    if (!container || !images.length) return;

    let locked = false;

    const handleWheel = (event) => {
      event.preventDefault();

      if (locked) return;

      locked = true;

      if (
        event.deltaY > 0 ||
        event.deltaX > 0
      ) {
        changeActive(
          activeIndexRef.current + 1
        );
      } else {
        changeActive(
          activeIndexRef.current - 1
        );
      }

      window.setTimeout(() => {
        locked = false;
      }, 300);
    };

    container.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    return () => {
      container.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, [changeActive, images.length]);

  /*
   * Keyboard controls.
   */
  useEffect(() => {
    if (!images.length) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();

        changeActive(
          activeIndexRef.current + 1
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        changeActive(
          activeIndexRef.current - 1
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [changeActive, images.length]);

  /*
   * Touch swipe.
   */
  const touchStartRef =
    useRef(null);

  const handleTouchStart = (event) => {
    touchStartRef.current =
      event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartRef.current === null
    ) {
      return;
    }

    const end =
      event.changedTouches[0].clientX;

    const distance =
      touchStartRef.current - end;

    if (Math.abs(distance) > 45) {
      if (distance > 0) {
        changeActive(
          activeIndexRef.current + 1
        );
      } else {
        changeActive(
          activeIndexRef.current - 1
        );
      }
    }

    touchStartRef.current = null;
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="wave-gallery-wrapper">
      <div
        ref={containerRef}
        className="wave-gallery"
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="wave-gallery__ambient" />

        {images.map((item, index) => (
          <button
            key={item._id}
            ref={(element) => {
              cardsRef.current[index] =
                element;
            }}
            type="button"
            className={`wave-gallery__card ${
              index === activeIndex
                ? "is-active"
                : ""
            }`}
            onClick={() => {
              changeActive(index);
              onSelect(item);
            }}
            aria-label={`View ${item.title}`}
          >
            <div className="wave-gallery__image">
              <img
                src={item.imageUrl.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_700/"
                )}
                alt={item.title}
                loading={
                  Math.abs(
                    index - activeIndex
                  ) <= 2
                    ? "eager"
                    : "lazy"
                }
                decoding="async"
                draggable="false"
              />

              <div className="wave-gallery__view">
                <span>VIEW</span>
              </div>
            </div>

            <div className="wave-gallery__caption">
              <span className="wave-gallery__index">
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span className="wave-gallery__title">
                {item.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="wave-gallery__controls">
        <button
          type="button"
          onClick={() =>
            changeActive(
              activeIndexRef.current - 1
            )
          }
          aria-label="Previous image"
        >
          ←
        </button>

        <span>
          {String(activeIndex + 1).padStart(
            2,
            "0"
          )}
          <i>/</i>
          {String(images.length).padStart(
            2,
            "0"
          )}
        </span>

        <button
          type="button"
          onClick={() =>
            changeActive(
              activeIndexRef.current + 1
            )
          }
          aria-label="Next image"
        >
          →
        </button>
      </div>

      <div className="wave-gallery__hint">
        SCROLL <span>•</span> DRAG{" "}
        <span>•</span> CLICK
      </div>
    </div>
  );
};

export default WaveGallery;