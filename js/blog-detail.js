/**
 * Crispster — Dynamic Blog Detail Loader
 * Dynamically renders the selected article based on ?id= query param
 */

(function () {
  'use strict';

  const ARTICLES_DB = {
    'buttermilk-crunch': {
      id: 'buttermilk-crunch',
      categoryTag: '<i class="fa-solid fa-flask"></i> Culinary Chemistry',
      title: 'The Chemistry of Crunch: Why 24 Hours in Buttermilk Changes Everything',
      authorName: 'Chef Marcus Vance',
      authorRole: 'Executive Chef & Co-Founder',
      authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      authorBio: 'Marcus has over 15 years of experience in classical Southern frying and fine dining hospitality. He leads culinary R&D across all Crispster kitchens.',
      date: 'November 2, 2026',
      readTime: '6 Min Read',
      commentsCount: 24,
      image: 'images/blog/blog1.jpg',
      imageAlt: 'Crispster Triple Dredged Fried Chicken Platter',
      bodyHtml: `
        <p>
          Fried chicken is often viewed as simple comfort food, but achieving that shatteringly crisp shell while preserving succulence right down to the bone is one of the most demanding technical feats in culinary chemistry.
        </p>

        <p>
          At Crispster, we refuse to take shortcuts. In an era where commercial kitchens dredge chicken in tap water for twenty seconds and rely on heavy chemical coatings to mask stale poultry, we rely on a traditional 24-hour buttermilk fermentation technique combined with precision thermal physics.
        </p>

        <blockquote>
          "The magic of cultured buttermilk isn't just flavor — it is a biochemical engine. Its natural lactic acid gently denatures tough collagen without turning poultry mushy, creating internal capillary channels that hold savory herbs."
        </blockquote>

        <h2>1. The Lactic Acid Engine: Gentle Tenderization</h2>
        <p>
          Vinegar or lemon juice contains harsh acetic and citric acids that can easily "cook" the exterior of raw poultry if left for more than two hours, resulting in a rubbery, stringy texture. Buttermilk, by contrast, contains lactic acid — a far gentler organic acid that tenderizes steadily over twenty-four hours without damaging delicate muscle fibers.
        </p>
        <p>
          As the chicken rests in our refrigerated 38°F vats, the cultured enzymes break down tough connective tissues while allowing our 12 crushed botanicals (including smoked paprika, white pepper, dried thyme, celery seed, and garlic powder) to absorb deep into the meat.
        </p>

        <h2>2. The Triple Dredge: Constructing Microscopic Crunch Ridges</h2>
        <p>
          When food hits hot oil, surface moisture expands into steam. If a dredge is too thin or uniform, steam blows the batter right off the meat, creating an oily bubble. If it is too dense, you get heavy bread that tastes like dough.
        </p>
        <p>
          Our line cooks employ a <strong>triple hand-dredge</strong> method:
        </p>
        <ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style: disc;">
          <li style="margin-bottom: 0.5rem;"><strong>First Pass:</strong> A dusting in light seasoned starch to dry the outer skin.</li>
          <li style="margin-bottom: 0.5rem;"><strong>Second Pass:</strong> A quick re-dip into buttermilk wash to create surface adhesion.</li>
          <li style="margin-bottom: 0.5rem;"><strong>Third Pass:</strong> A vigorous toss and shake in coarse unbleached flour, creating thousands of tiny craggy micro-ridges.</li>
        </ul>

        <h2>3. The 375°F Thermal Seal</h2>
        <p>
          When those micro-ridges submerge into pure high-smoke vegetable oil at exactly 375°F, surface moisture instantly vaporizes into microscopic steam jets. This rapid outward steam pressure acts as a natural pressure valve — preventing oil from penetrating inward while frying the ridges into golden, crunchy glass.
        </p>

        <div class="why-card" style="background: var(--bg-card); border-left: 5px solid var(--color-hot-orange); margin-block: 2.5rem; padding: 1.75rem;">
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-hot-orange); margin-bottom: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Key Takeaway for Home Cooks
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0;">
            Never overcrowd your fryer or pot! Dropping too many cold chicken pieces at once plummets the oil temperature down to 310°F. At that low temperature, steam pressure collapses, oil rushes into the coating, and your chicken turns soggy and greasy.
          </p>
        </div>
      `
    },

    'spice-vault': {
      id: 'spice-vault',
      categoryTag: '<i class="fa-solid fa-mortar-pestle"></i> Secret Seasonings',
      title: "The 12-Spice Vault: Anatomy of Crispster's Botanical Coating",
      authorName: 'Elena Rostova',
      authorRole: 'Master Spice Blender',
      authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      authorBio: 'Elena specializes in ancient peppercorn genetics and cold-ground spices. She formulated Crispster\'s iconic 12-botanical dredge ratio.',
      date: 'October 31, 2026',
      readTime: '5 Min Read',
      commentsCount: 18,
      image: 'images/blog/blog2.jpg',
      imageAlt: '12-Spice Fried Chicken Dredge Blend',
      bodyHtml: `
        <p>
          The culinary landscape is crowded with fast-food brands claiming "secret recipes" made of table salt, chemical MSG, and industrial onion powder. At Crispster, our botanical vault is built upon the same flavor theory used by master perfumers: balancing volatile high notes, warm mids, and deep earthy anchors.
        </p>

        <p>
          When fried chicken hits the palate, your tongue shouldn't just register salt and fat. You should experience an evolving sequence of sensations — floral brightness, savory warmth, pungent sharpness, and an aromatic citrus finish that invites the next crunch.
        </p>

        <blockquote>
          "A great spice dredge isn't a mask; it is an amplifier. When botanical oils encounter 375°F fat for under ten minutes, they bloom into compounds that cannot be replicated by pre-packaged commercial breading mixes."
        </blockquote>

        <h2>1. The Foundation: Smoked Hungarian Paprika &amp; Tellicherry Peppercorns</h2>
        <p>
          We source high-oil Tellicherry black peppercorns, harvested only from the uppermost vines in Kerala where sunlight maximizes piperine concentration. Cold-milled into coarse cracked granules, they deliver sustained floral heat rather than the harsh throat-burn of dusty pre-ground pepper.
        </p>
        <p>
          Paired with slow oak-smoked Hungarian paprika, this base layer imparts our signature dark gold coloration without relying on artificial coloring or excessive turmeric.
        </p>

        <h2>2. The Mid-Notes: Wild Mediterranean Thyme &amp; Toasted Celery Seed</h2>
        <p>
          Dried poultry herbs often go bitter when fried. Our culinary team discovered that lightly crushing whole wild thyme and toasted celery seeds releases their essential oils into the flour starch without scorching during frying. Celery seed, rich in natural sedanenolide, triggers savory receptors that make every bite linger on the tongue.
        </p>

        <h2>3. The Secret Catalyst: Micro-Ground Yellow Mustard Flour</h2>
        <p>
          The most critical component of the 12-spice vault is dry yellow mustard flour. Beyond its sharp piquancy, mustard contains natural sinigrin and plant emulsifiers. In hot frying fat, it acts as a molecular bridge between the chicken's natural juices and the exterior crust, ensuring the seasoning clings tightly to every crevice.
        </p>

        <div class="why-card" style="background: var(--bg-card); border-left: 5px solid var(--color-hot-orange); margin-block: 2.5rem; padding: 1.75rem;">
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-hot-orange); margin-bottom: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> The Roast-Before-Mill Rule
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0;">
            Never grind raw, cold spices into your breading. We toast our coriander, cumin, and celery seeds at 215°F for exactly 4 minutes before milling. This evaporates trapped humidity and awakens essential terpenes for maximum aromatic punch.
          </p>
        </div>
      `
    },

    'wings-showdown': {
      id: 'wings-showdown',
      categoryTag: '<i class="fa-solid fa-fire-burner"></i> Wing Culture',
      title: 'Nashville Heat vs. Korean Gochujang: The Great Wing Showdown',
      authorName: 'Clara Morales',
      authorRole: 'Sauce Lab Director',
      authorAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=100&q=80',
      authorBio: 'Clara has traveled across Nashville, Seoul, and Buffalo to study the physics of hot wing coatings and emulsified spicy glazes.',
      date: 'October 28, 2026',
      readTime: '4 Min Read',
      commentsCount: 31,
      image: 'images/blog/blog3.jpg',
      imageAlt: 'Nashville Wings vs Korean Glaze',
      bodyHtml: `
        <p>
          Wing aficionados are fiercely tribal. Mention hot chicken in Nashville, and you'll hear hymns dedicated to cayenne-infused lard pools. Bring up fried wings in Seoul, and you'll enter the realm of double-fried glass skin drenched in fermented gochujang and roasted garlic honey.
        </p>

        <p>
          At Crispster's sauce laboratory, we pitted these two world-class traditions head-to-head in a blind sensory showdown to understand what makes each style so addictive — and how we bridge the best of both worlds.
        </p>

        <blockquote>
          "A great wing must pass the Ten-Minute Acoustic Test: if the shell softens and surrenders its crunch under the glaze before you finish your fourth wing, the kitchen has failed the fundamental physics of frying."
        </blockquote>

        <h2>1. The Nashville Philosophy: Oil-Soluble Capsaicin</h2>
        <p>
          Nashville hot chicken doesn't rely on sticky sugars or acidic tomato pastes. Instead, cooks blend fiery cayenne, smoked habanero, brown sugar, and garlic powder directly into a ladle of 350°F frying lard, pouring it over freshly fried chicken.
        </p>
        <p>
          Because capsaicin is fat-soluble and virtually waterless, this hot oil dip seasons the crust aggressively without introducing moisture. The crust stays crunchy for hours because oil cannot make fried starches soggy.
        </p>

        <h2>2. The Korean Philosophy: Double-Frying and Fermented Umami</h2>
        <p>
          Korean-style chicken takes the opposite approach. Wings are coated in potato starch, fried once at 330°F to gently cook through, rested on racks for five minutes to let internal steam escape, and fried a second time at 380°F to blister the shell into shattered candy glass.
        </p>
        <p>
          The wings are then tossed in a hot reduction of aged red chili paste (gochujang), wild clover honey, grated ginger, and toasted sesame oil. The fermented glutamates produce an umami punch that dry rubs simply cannot replicate.
        </p>

        <h2>3. The Crispster Hybrid Technique</h2>
        <p>
          Why force guests to choose? Crispster's Reaper-Gochujang wings use the Korean double-fry starch method to build an impermeable glass shell, finished with a quick flash-toss in our reduced gochujang-cayenne glaze that clings without softening the ridges.
        </p>

        <div class="why-card" style="background: var(--bg-card); border-left: 5px solid var(--color-hot-orange); margin-block: 2.5rem; padding: 1.75rem;">
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-hot-orange); margin-bottom: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Chef's Secret for Takeaway Crunch
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0;">
            Always order your takeaway wings with sauce tossed fresh, but ask for the lid slightly vented. If steam builds up inside a solid plastic takeaway container for even 8 minutes, the glass coating will dissolve into batter!
          </p>
        </div>
      `
    },

    '375-sweet-spot': {
      id: '375-sweet-spot',
      categoryTag: '<i class="fa-solid fa-temperature-arrow-up"></i> Fry Mastery',
      title: 'Why 375°F Is The Exact Sweet Spot For Non-Greasy Chicken',
      authorName: 'David Chen',
      authorRole: 'Operations & Thermodynamics Lead',
      authorAvatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=100&q=80',
      authorBio: 'David holds a mechanical engineering degree and calibrates all high-recovery commercial fryers across our takeaway network.',
      date: 'October 20, 2026',
      readTime: '5 Min Read',
      commentsCount: 15,
      image: 'images/blog/blog4.jpg',
      imageAlt: 'Fryer Temperature Precision',
      bodyHtml: `
        <p>
          Everyone has bitten into fried chicken that leaves their hands coated in heavy grease and their stomach feeling weighed down. The common complaint is usually: "This was fried in bad oil" or "The batter soaked up all the fat."
        </p>

        <p>
          In reality, grease absorption isn't caused by the recipe — it is a direct consequence of thermodynamic failure during the first 90 seconds of immersion.
        </p>

        <blockquote>
          "Oil does not force its way into chicken. Rather, chicken invites oil in when internal steam pressure collapses. If you keep the steam pushing outward, the oil can never cross the barrier."
        </blockquote>

        <h2>1. The Micro-Steam Shield Principle</h2>
        <p>
          Chicken meat is approximately 70% water. When dredged poultry plunges into high-smoke oil heated to 375°F (190°C), surface water instantly reaches its boiling point and turns into high-velocity steam jets pushing outward through the starch.
        </p>
        <p>
          These microscopic steam bubbles act as a physical force field. As long as outward pressure is maintained, frying oil is physically blocked from penetrating deeper than 0.8 millimeters into the crust.
        </p>

        <h2>2. The 320°F Trap: When The Shield Collapses</h2>
        <p>
          If you drop five large, refrigerated bone-in breasts into an undersized pot or weak fryer, the oil temperature instantly plunges by 50 to 60 degrees down to 315°F–320°F.
        </p>
        <p>
          At 320°F, steam production slows drastically. The internal pressure drops below external hydrostatic pressure. The crust ceases to expel vapor, and instead acts like a sponge, drinking in lukewarm oil until it becomes limp and sodden.
        </p>

        <h2>3. Thermal Recovery Curves in Crispster Vats</h2>
        <p>
          Our kitchens utilize high-efficiency computer-monitored fry vats engineered with instant micro-induction heating. When cold chicken enters the vat, high-speed thermal injectors compensate within 6 seconds, keeping the temperature delta within &plusmn;3°F of the 375°F sweet spot.
        </p>

        <div class="why-card" style="background: var(--bg-card); border-left: 5px solid var(--color-hot-orange); margin-block: 2.5rem; padding: 1.75rem;">
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--color-hot-orange); margin-bottom: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> The Home Fryer Golden Rule
          </div>
          <p style="font-size: 0.95rem; margin-bottom: 0;">
            Never fry cold chicken straight from the fridge! Let marinated pieces sit at room temperature for 18–20 minutes before dredging. Bringing the internal temperature to 55°F prevents the oil from thermal shock upon immersion.
          </p>
        </div>
      `
    }
  };

  function initBlogDetail() {
    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get('id');
    const article = (requestedId && ARTICLES_DB[requestedId]) ? ARTICLES_DB[requestedId] : ARTICLES_DB['buttermilk-crunch'];

    // Update document title
    document.title = `${article.title} — Crispster Fried Chicken`;

    // 1. Category Tag
    const categoryTag = document.getElementById('articleCategoryTag');
    if (categoryTag) {
      categoryTag.innerHTML = article.categoryTag;
    }

    // 2. Title
    const titleEl = document.getElementById('articleHeroTitle');
    if (titleEl) {
      titleEl.textContent = article.title;
    }

    // 3. Metadata
    const authorSpan = document.getElementById('articleMetaAuthor');
    if (authorSpan) {
      authorSpan.innerHTML = `<i class="fa-solid fa-user"></i> By ${article.authorName}`;
    }

    const dateSpan = document.getElementById('articleMetaDate');
    if (dateSpan) {
      dateSpan.innerHTML = `<i class="fa-regular fa-calendar"></i> ${article.date}`;
    }

    const timeSpan = document.getElementById('articleMetaTime');
    if (timeSpan) {
      timeSpan.innerHTML = `<i class="fa-regular fa-clock"></i> ${article.readTime}`;
    }

    const commentsSpan = document.getElementById('articleMetaComments');
    if (commentsSpan) {
      commentsSpan.innerHTML = `<i class="fa-solid fa-comments"></i> ${article.commentsCount} Foodie Comments`;
    }

    // 4. Hero Banner Image
    const heroImage = document.getElementById('articleHeroImage');
    if (heroImage) {
      heroImage.src = article.image;
      heroImage.alt = article.imageAlt;
    }

    // 5. Article Prose Body
    const bodyEl = document.getElementById('articleBody');
    if (bodyEl) {
      bodyEl.innerHTML = article.bodyHtml;
    }

    // 6. Author Spotlight
    const authorSection = document.getElementById('articleAuthorSection');
    if (authorSection) {
      authorSection.innerHTML = `
        <div class="why-card reveal-on-scroll" style="display: flex; flex-direction: row; align-items: center; gap: 2rem; flex-wrap: wrap;">
          <img src="${article.authorAvatar}" 
               alt="${article.authorName}" 
               style="width: 90px; height: 90px; border-radius: var(--radius-full); object-fit: cover; border: 3px solid var(--color-primary-yellow);">
          <div style="flex: 1; min-width: 240px;">
            <h3 style="font-size: 1.35rem; margin-bottom: 0.25rem;">Written By ${article.authorName}</h3>
            <div style="color: var(--color-hot-orange); font-size: 0.85rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem;">${article.authorRole}</div>
            <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 0;">
              ${article.authorBio}
            </p>
          </div>
        </div>
      `;
    }

    // 7. Update Discussions Count badge
    const countBadge = document.getElementById('discussionsCountBadge');
    if (countBadge) {
      countBadge.textContent = article.commentsCount > 3 ? '3' : article.commentsCount;
    }

    // 8. Dynamic Social Share Links
    const currentUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`"${article.title}" via Crispster Takeaway`);
    const shareX = document.getElementById('shareBtnX');
    if (shareX) {
      shareX.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareTitle}`;
    }
    const shareFb = document.getElementById('shareBtnFb');
    if (shareFb) {
      shareFb.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
    }
    const shareWa = document.getElementById('shareBtnWa');
    if (shareWa) {
      shareWa.href = `https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`;
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogDetail);
  } else {
    initBlogDetail();
  }
})();

