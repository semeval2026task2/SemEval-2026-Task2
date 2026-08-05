<style>
  #openBtn {
    display: block;
    margin: 40px auto;
    padding: 12px 22px;
    background: #24292e;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
  }

  #consentModal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  #consentBox {
    background: #fff;
    padding: 25px 30px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    font-family: Arial, sans-serif;
  }

  #consentBox h2 {
    margin-top: 0;
    font-size: 1.2em;
  }

  #consentBox h3 {
    font-size: 1em;
    margin-bottom: 5px;
  }

  #consentBox ul {
    padding-left: 20px;
    margin-bottom: 15px;
  }

  #consentBox label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 15px 0;
    font-weight: bold;
  }

  #confirmBtn {
    background: #2ea44f;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 6px;
    font-weight: bold;
    cursor: not-allowed;
    opacity: 0.5;
  }

  #confirmBtn.enabled {
    cursor: pointer;
    opacity: 1;
  }

  #downloadSection {
    display: none;
    text-align: center;
    margin-top: 30px;
  }
</style>

<!-- <button id="openBtn" onclick="openModal()">View Dataset Terms</button> -->

<div id="consentModal">
  <div id="consentBox">
    <h2>Disclaimer & Usage Terms</h2>

    <h3>Disclaimer about the Datasets</h3>
    <ul>
      <li>Organizers and affiliated institutions provide no warranties on dataset correctness or completeness.</li>
      <li>They are not liable for dataset access or usage.</li>
    </ul>

    <h3>Dataset Usage Restrictions</h3>
    <ul>
      <li>Datasets should be used only for scientific or research purposes.</li>
      <li>Any other use is explicitly prohibited.</li>
      <li>Datasets must not be redistributed or shared with third parties.</li>
      <li>Interested parties should be directed to the official website.</li>
    </ul>

    <label>
      <input type="checkbox" id="consentCheckbox" onchange="toggleButton()">
      I have read and consent to the above terms.
    </label>

    <button id="confirmBtn" onclick="confirmConsent()" disabled>Confirm</button>
  </div>
</div>

<div id="downloadSection">
    <img src="https://img.shields.io/badge/⬇ Download Dataset (ZIP)-2ea44f?style=for-the-badge" alt="Download Dataset">
  </a>
</div>

<script>
  function openModal() {
    document.getElementById('consentModal').style.display = 'flex';
  }

  function toggleButton() {
    const checkbox = document.getElementById('consentCheckbox');
    const btn = document.getElementById('confirmBtn');
    btn.disabled = !checkbox.checked;
    btn.classList.toggle('enabled', checkbox.checked);
  }

  function confirmConsent() {
    document.getElementById('consentModal').style.display = 'none';
    document.getElementById('downloadSection').style.display = 'block';
  }
</script>