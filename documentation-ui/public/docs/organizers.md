# Task Organizers
---

<div class="organizer-grid">

<figure>
  <img src="images/nikita_soni.jpeg"  alt="Nikita Soni">
  <figcaption><strong>Nikita Soni</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/andrew_schwartz.jpg"  alt="H Andrew Schwartz">
  <figcaption><strong>H Andrew Schwartz</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/ryan_boyd.jpg"  alt="Ryan L. Boyd">
  <figcaption><strong>Ryan L. Boyd</strong><br>University of Texas at Dallas, USA</figcaption>
</figure>

<figure>
  <img src="images/tony-bui.jpg"  alt="Tony Bui">
  <figcaption><strong>Tony Bui</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/syeda_mahwish.jpeg"  alt="Syeda Mahwish">
  <figcaption><strong>Syeda Mahwish</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/august_nilsson.jpeg"  alt="August Nilsson">
  <figcaption><strong>August Nilsson</strong><br>Oslo Metropolitan University, Norway</figcaption>
</figure>

<figure>
  <img src="images/adithya_ganesan.jpeg"  alt="Adithya V. Ganesan">
  <figcaption><strong>Adithya V. Ganesan</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/lyle_ungar.jpg"  alt="Lyle Ungar">
  <figcaption><strong>Lyle Ungar</strong><br>University of Pennsylvania, USA</figcaption>
</figure>

<figure>
  <img src="images/niranjan_balasubramanian.jpg"  alt="Niranjan Balasubramanian">
  <figcaption><strong>Niranjan Balasubramanian</strong><br>Stony Brook University, USA</figcaption>
</figure>

<figure>
  <img src="images/saif_mohammad.jpeg"  alt="Saif M. Mohammad">
  <figcaption><strong>Saif M. Mohammad</strong><br>NRC Canada</figcaption>
</figure>

</div>

<style>
.organizer-grid{
  /* 4 columns fixed at 200 px; horizontal scroll on phones */
  display:grid;
  grid-template-columns: repeat(4, 200px);
  gap: 3rem 4rem;
  justify-content:center;
  overflow:hidden;
  padding-bottom:1rem;
}
.organizer-grid figure{
  margin:0;
  width:200px;               /* card width  */
  height:260px;              /* card height */
  text-align:center;
}
.organizer-grid img{
  width:200px; height:200px; /* photo size  */
  object-fit:cover; border-radius:50%;
  box-shadow:0 2px 6px rgba(0,0,0,.15);
}
.organizer-grid figcaption{
  margin-top:0.5rem;
  height:60px;               /* caption box keeps every card equal height */
  display:flex; flex-direction:column;
  justify-content:flex-start; align-items:center;
}
.organizer-grid strong{ color:#1a54c2; }  /* blue name */
</style>
