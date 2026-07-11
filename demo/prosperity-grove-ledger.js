const periodSelect = document.querySelector("#period-select");
const periodStatus = document.querySelector("#period-status");
const openEntry = document.querySelector("#open-entry");
const entryDialog = document.querySelector("#entry-dialog");
const entryForm = document.querySelector("#entry-form");
const cancelEntry = document.querySelector("#cancel-entry");
const entryDescription = document.querySelector("#entry-description");
const ledgerBody = document.querySelector("#ledger-table tbody");
const ledgerLive = document.querySelector("#ledger-live");

periodSelect.addEventListener("change", () => {
  periodStatus.textContent = `Showing the ${periodSelect.value} sample ledger.`;
});

openEntry.addEventListener("click", () => {
  entryDialog.showModal();
  entryDescription.focus();
});

cancelEntry.addEventListener("click", () => entryDialog.close());

entryForm.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.target instanceof HTMLButtonElement || event.target instanceof HTMLTextAreaElement) return;
  event.preventDefault();
  entryForm.requestSubmit();
});

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!entryForm.reportValidity()) return;

  const data = new FormData(entryForm);
  const amount = Number(data.get("amount"));
  const row = document.createElement("tr");
  const formattedAmount = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(Math.abs(amount));
  row.innerHTML = `<td>Jul 16</td><td></td><td></td><td>${amount >= 0 ? "+" : "−"}${formattedAmount}</td><td><span class="ov-chip ov-chip--amber">Sample</span></td>`;
  row.children[1].textContent = String(data.get("description"));
  row.children[2].textContent = String(data.get("category"));
  ledgerBody.prepend(row);
  ledgerLive.textContent = `Added ${data.get("description")} to the sample ledger.`;
  entryForm.reset();
  entryDialog.close();
  openEntry.focus();
});

entryDialog.addEventListener("close", () => {
  if (document.activeElement === document.body) openEntry.focus();
});
