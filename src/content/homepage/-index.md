---
import { Image } from "astro:assets";
import Base from "@/layouts/Base.astro";
import Cta from "@/layouts/components/Cta.astro";
import Post from "@/layouts/partials/Post.astro";
import { getSinglePage } from "@/lib/contentParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { getEntry } from "astro:content";
import type { CollectionEntry } from "astro:content";

// Fetch content for the homepage sections
const homepage = await getEntry("homepage", "-index");

// Add a check to ensure the homepage content exists
if (!homepage) {
  throw new Error(
    "Homepage content not found. Please ensure 'src/content/homepage/-index.md' exists.",
  );
}

const { banner, feature, services, workflow, call_to_action } =
  homepage.data;

// Fetch and sort the latest 3 blog posts
const posts = await getSinglePage("blog");
const sortedPosts = sortByDate(posts);
const recentPosts = sortedPosts.slice(0, 3);
---

<Base>
  {/* Banner Section - Split Layout */}
  <section class="hero-section">
    {/* Left Side: Text Content */}
    <div class="hero-content-wrapper">
      <h1 class="font-primary font-bold">{banner?.title}</h1>
      {banner?.content && (
        <div
          class="mt-4 text-text-dark hero-content"
          set:html={banner.content}
        />
      )}
      {/* Button removed from here as per previous request */}
    </div>
    {/* Right Side: Image Background */}
    <div
      class="hero-image-wrapper"
      >
      {/* Image removed from here */}
    </div>
  </section>

  {/* CTA Bar */}
  <a
    href={banner?.button?.link ?? '/contact'}
    class="block w-full bg-dark py-12 text-center font-primary text-2xl font-bold text-white transition-colors duration-300 hover:bg-primary-hover hover:text-black"
  >
    {banner?.button?.label ?? 'Contact Us'}
  </a>

  {/* Features Section (Our Core Services) */}
  <section class="section bg-light py-16 md:py-20">
    <div class="container mx-auto px-4">
      <div class="text-center">
        <h2 class="font-primary font-bold text-3xl md:text-4xl">{feature?.title}</h2>
      </div>
      <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {feature?.features?.map((item) => (
          <div
            class="feature-card group rounded-xl bg-white p-6 pb-8 text-center text-text transition-colors duration-300 ease-in-out hover:bg-primary-hover hover:text-white"
          >
            {item.icon && (
              <div>
                <img
                  class="mx-auto h-10 w-10"
                  alt={item.name}
                  src={item.icon}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div class="mt-4">
              <p class="h5 font-primary font-bold text-xl">{item.name}</p>
              <p class="mt-3 text-base">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Services Section */}
  {
    services?.map((service, index) => {
      const isOdd = index % 2 > 0;
      return (
        <section class={`section ${isOdd && "bg-light"}`}>
          <div class="container">
            <div class="items-center gap-8 md:grid md:grid-cols-2">
              <div class={`service-carousel ${!isOdd && "md:order-2"}`}>
                {service?.images?.length > 1 ? (
                  <div class="swiper">
                    <div class="swiper-wrapper">
                      {service.images?.map((image) => (
                        <div class="swiper-slide">
                          <Image
                            class="mx-auto"
                            src={image}
                            width={538}
                            height={328}
                            alt=""
                          />
                        </div>
                      ))}
                    </div>
                    <div class="pagination" />
                  </div>
                ) : (
                  <Image
                    class="mx-auto"
                    src={service?.images?.[0]}
                    width={538}
                    height={328}
                    alt=""
                  />
                )}
              </div>

              <div
                class={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"}`}
              >
                <h2 class="font-bold leading-[40px]">{service?.title}</h2>
                <p class="mt-4 mb-2">{service?.content}</p>
                {service?.button?.enable && (
                  <a
                    href={service?.button.link}
                    class="cta-link inline-flex items-center text-primary"
                  >
                    {service?.button.label}
                    <img
                      class="ml-1"
                      src="/images/arrow-right.svg"
                      width={18}
                      height={14}
                      alt="arrow"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    })
  }

  {/* Workflow Section */}
  <section class="section pb-0">
    <div class="mb-8 text-center">
      <h2
        class="mx-auto max-w-[400px] font-bold leading-[44px]"
      >{workflow?.title}</h2>
      <p class="mt-3">{workflow?.description}</p>
    </div>
    {/* Workflow Image was here, now removed */}
  </section>

  {/* Recent Blog Posts Section */}
  <section class="section">
    <div class="container">
      <div class="text-center">
        <h2>Latest Insights</h2>
        <p class="mt-4">
          Stay updated with the latest news and strategies in digital marketing.
        </p>
      </div>
      <div class="row mt-12 justify-center">
        {recentPosts.map((post) => (
          <div class="col-12 mb-8 sm:col-6 lg:col-4">
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Call to Action Section */}
  <Cta cta={call_to_action} />

</Base>

<script>
  import { Swiper } from "swiper";
  import { Autoplay, Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";

  document.addEventListener("astro:page-load", () => {
    const carousels = document.querySelectorAll(".service-carousel .swiper");
    if (carousels.length > 0) {
      new Swiper(".service-carousel .swiper", {
        modules: [Pagination, Autoplay],
        pagination: {
          type: "bullets",
          el: ".service-carousel .pagination",
          clickable: true,
        },
      });
    }
  });
</script>

{/* Custom CSS for Hero Section */}
<style>
  .hero-content {
    font-family: var(--font-accent, serif);
    font-weight: 400;
  }
  .hero-section {
    display: grid;
    grid-template-columns: 1fr;
  }
  .hero-content-wrapper {
    padding: 5rem 2rem;
    text-align: center;
  }
  .hero-image-wrapper {
    display: none; /* Hidden on mobile by default */
    background-color: #2d3238; /* Dark Grey background */
    /* background-image: url(/images/header.png); /* <-- THIS LINE IS NOW REMOVED */
    background-size: cover;
    background-position: center;
    display: flex; /* Ensure it's displayed on desktop */
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) {
    .hero-section {
      grid-template-columns: 1fr 1fr;
    }
    .hero-content-wrapper {
      padding: 5rem;
      text-align: left;
    }
    .hero-image-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 40vh;
    }
  }
  /* Basic container/section styles if needed */
  .container {
     max-width: 1140px;
     margin-left: auto;
     margin-right: auto;
     padding-left: 1rem;
     padding-right: 1rem;
  }
   .section {
      padding-top: 4rem;
      padding-bottom: 4rem;
  }
</style>