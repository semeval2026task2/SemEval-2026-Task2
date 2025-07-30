# Task Organizers
---

<!-- ▸ Responsive flexbox grid  -->
<div class="organizer-grid">

  <figure>
    <img src="../images/nikita_soni.jpeg"  alt="Nikita Soni">
    <figcaption><strong>Nikita Soni</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/andrew_schwartz.jpg"  alt="H Andrew Schwartz">
    <figcaption><strong>H Andrew Schwartz</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/ryan_boyd.jpg"  alt="Ryan L Boyd">
    <figcaption><strong>Ryan L Boyd</strong><br>University of Texas at Dallas, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/tony-bui.jpg"  alt="Tony Bui">
    <figcaption><strong>Tony Bui</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/syeda_mahwish.jpeg"  alt="Syeda Mahwish">
    <figcaption><strong>Syeda Mahwish</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/august_nilsson.jpeg"  alt="August Nilsson">
    <figcaption><strong>August Nilsson</strong><br>Oslo Metropolitan University, Norway</figcaption>
  </figure>

  <figure>
    <img src="../images/adithya_ganesan.jpeg"  alt="Adithya V Ganesan">
    <figcaption><strong>Adithya V Ganesan</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/lyle_ungar.jpg"  alt="Lyle Ungar">
    <figcaption><strong>Lyle Ungar</strong><br>University of Pennsylvania, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/niranjan_balasubramanian.jpg"  alt="Niranjan Balasubramanian">
    <figcaption><strong>Niranjan Balasubramanian</strong><br>Stony Brook University, USA</figcaption>
  </figure>

  <figure>
    <img src="../images/saif_mohammad.jpeg"  alt="Saif M Mohammad">
    <figcaption><strong>Saif M Mohammad</strong><br>NRC Canada</figcaption>
  </figure>

</div>

<!-- ▸ Inline CSS (could also live in a site-wide stylesheet) -->
<style>
.organizer-grid{
  display:flex; flex-wrap:wrap; justify-content:center; gap:3rem 5rem;
  margin-top:1rem;
}
.organizer-grid figure{
  margin:0; text-align:center; width:180px;
}
.organizer-grid img{
  width:180px; height:180px; object-fit:cover; border-radius:50%;
  box-shadow:0 2px 6px rgba(0,0,0,.15);
}
.organizer-grid strong{ color:#1a54c2; }          /* blue name */
@media (max-width: 720px){                        /* 2-col on small screens */
  .organizer-grid{ gap:2rem 3rem; }
  .organizer-grid figure{ width:45%; }
}
</style>
