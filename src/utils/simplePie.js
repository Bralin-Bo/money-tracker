export function createSimpleChart(pieChart, legend, tooltip, data) {
  const total = data.values.reduce((a, b) => a + b, 0);

  pieChart.innerHTML = '';
  legend.innerHTML = '';

  // Create base chart with conic gradient
  const baseChart = document.createElement('div');
  baseChart.style.width = '300px';
  baseChart.style.height = '300px';
  baseChart.style.borderRadius = '50%';
  // baseChart.style.position = 'absolute';
  baseChart.style.top = '0';
  baseChart.style.left = '0';

  let cumulativePercent = 0;
  const gradientParts = data.values.map((value, i) => {
    const startPercent = cumulativePercent;
    const endPercent = cumulativePercent + (value / total) * 100;
    cumulativePercent = endPercent;
    return `${data.colors[i]} ${startPercent}% ${endPercent}%`;
  });

  baseChart.style.background = `conic-gradient(${gradientParts.join(', ')})`;
  pieChart.appendChild(baseChart);

  // Mouse move detection
  pieChart.addEventListener('mousemove', (e) => {
    const rect = pieChart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    let angle = Math.atan2(mouseY, mouseX) * 180 / Math.PI;
    if (angle < 0) angle += 360;
    angle = (angle + 90) % 360;

    let cumulativeAngle = 0;
    let hoveredSlice = -1;

    for (let i = 0; i < data.values.length; i++) {
      const sliceAngle = (data.values[i] / total) * 360;
      if (angle >= cumulativeAngle && angle < cumulativeAngle + sliceAngle) {
        hoveredSlice = i;
        break;
      }
      cumulativeAngle += sliceAngle;
    }

    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    if (distance <= 150 && hoveredSlice !== -1) {
      const percentage = (data.values[hoveredSlice] / total) * 100;
      tooltip.textContent = `${data.labels[hoveredSlice]}: ${data.values[hoveredSlice]} (${percentage.toFixed(1)}%)`;
      tooltip.style.left = e.clientX+ 15 + 'px';
      tooltip.style.top = e.clientY + 'px';
      tooltip.classList.add('show');

      baseChart.style.filter = 'brightness(1.1)';
      pieChart.style.cursor = 'pointer';
      pieChart.dataset.hoveredSlice = hoveredSlice;
    } else {
      tooltip.classList.remove('show');
      baseChart.style.filter = 'none';
      pieChart.style.cursor = 'default';
      pieChart.dataset.hoveredSlice = -1;
    }
  });

  pieChart.addEventListener('mouseleave', () => {
    tooltip.classList.remove('show');
    baseChart.style.filter = 'none';
    pieChart.style.cursor = 'default';
  });

  pieChart.addEventListener('click', () => {
    const hoveredSlice = parseInt(pieChart.dataset.hoveredSlice);
    if (hoveredSlice !== -1) {
      const percentage = (data.values[hoveredSlice] / total) * 100;
      console.log(`Clicked on ${data.labels[hoveredSlice]}: ${data.values[hoveredSlice]} (${percentage.toFixed(1)}%)`);
    }
  });

  // Create legend
  data.labels.forEach((label, i) => {
    const percentage = ((data.values[i] / total) * 100).toFixed(1);
    const listItem = document.createElement('li');

    const colorBox = document.createElement('div');
    colorBox.className = 'legend-color';
    colorBox.style.backgroundColor = data.colors[i];

    listItem.appendChild(colorBox);
    listItem.appendChild(document.createTextNode(`${label} - ${data.values[i]} (${percentage}%)`));

    // listItem.addEventListener('mouseenter', () => {
    //   tooltip.textContent = `${data.labels[i]}: ${data.values[i]} (${percentage}%)`;
    //   tooltip.style.left = '50%';
    //   tooltip.style.top = '20%';
    //   tooltip.classList.add('show');
    // });

    listItem.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });

    listItem.addEventListener('click', () => {
      console.log(`Legend clicked: ${data.labels[i]}: ${data.values[i]}`);
    });

    legend.appendChild(listItem);
  });
}
