function selectRandomItems(totalItems, numberOfItems) {
  const selected = [];
  while (selected.length < numberOfItems) {
    const randomIndex = Math.floor(Math.random() * totalItems);
    if (!selected.includes(randomIndex)) {
      selected.push(randomIndex);
    }
  }
  return selected;
}

module.exports = selectRandomItems;
