# Task Organizers
If you have any questions, please contact us at: [semeval2026task2@googlegroups.com](semeval2026task2@googlegroups.com)
---


<div class="organizer-grid">

<figure>
  <img src="images/nikita-soni.jpeg"  alt="Nikita Soni">
  <figcaption><strong>Nikita Soni</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/andrew_schwartz.jpg"  alt="H Andrew Schwartz">
  <figcaption><strong>H Andrew Schwartz</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/ryan-boyd.jpg"  alt="Ryan L. Boyd">
  <figcaption><strong>Ryan L. Boyd</strong>University of Texas at Dallas, USA</figcaption>
</figure>

<figure>
  <img src="images/tony-bui.jpg"  alt="Tony Bui">
  <figcaption><strong>Tony Bui</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/syeda_mahwish.jpeg"  alt="Syeda Mahwish">
  <figcaption><strong>Syeda Mahwish</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/august_nilsson.jpeg"  alt="August Nilsson">
  <figcaption><strong>August Nilsson</strong>Oslo Metropolitan University, Norway</figcaption>
</figure>

<figure>
  <img src="images/adithya_ganesan.jpeg"  alt="Adithya V. Ganesan">
  <figcaption><strong>Adithya V. Ganesan</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/lyle_ungar.jpg"  alt="Lyle Ungar">
  <figcaption><strong>Lyle Ungar</strong>University of Pennsylvania, USA</figcaption>
</figure>

<figure>
  <img src="images/niranjan_balasubramanian.jpg"  alt="Niranjan Balasubramanian">
  <figcaption><strong>Niranjan Balasubramanian</strong>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/saif_mohammad.jpeg"  alt="Saif M. Mohammad">
  <figcaption><strong>Saif M. Mohammad</strong>NRC Canada</figcaption>
</figure>

</div>

<style>
/* ▸ Grid layout — unchanged */

.organizer-grid{
  display:grid;
  grid-template-columns:repeat(4,200px);   /* fixed 4-col grid */
  gap:3rem 4rem;
  justify-content:center;
  padding-bottom:1rem;
  overflow:hidden;                         /* no extra scroll */
}

/* ▸ Card */
.organizer-grid figure{
  margin:0;
  width:200px; height:260px;
  text-align:center;
  transition:transform .25s ease, box-shadow .25s ease;
}

/* ▸ Photo */
.organizer-grid img{
  width:200px; height:200px;
  object-fit:cover;
  border-radius:50%;
  box-shadow:0 2px 6px rgba(0,0,0,.15);
  transition:transform .25s ease, box-shadow .25s ease;
}

/* ▸ Caption */
.organizer-grid figcaption{
  margin-top:.5rem;
  height:60px;
  display:flex; flex-direction:column;
  justify-content:flex-start; align-items:center;
}

.organizer-grid strong{
  color:#1a54c2;
  transition:text-decoration .25s;
}

/* ▸ 🔵 Hover / focus effect */
.organizer-grid figure:hover,
.organizer-grid figure:focus-within{
  transform:translateY(-4px);
}

.organizer-grid figure:hover img,
.organizer-grid figure:focus-within img{
  transform:scale(1.06);
  box-shadow:0 6px 14px rgba(0,0,0,.25);
}

.organizer-grid figure:hover strong,
.organizer-grid figure:focus-within strong{
  text-decoration:underline;
}
@media (max-width:600px){
  .organizer-grid{
    grid-template-columns:1fr;             /* single column */
    gap:2rem;
  }
  .organizer-grid figure{
    width:100%; height:auto;               /* card adapts to content */
  }
  .organizer-grid img{
    width:160px; height:160px;             /* slightly smaller photo */
  }
}
</style>

