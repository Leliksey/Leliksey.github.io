$(document).ready(function() {
    // Диаграмма состояние соединения
    const MotionStatexArray = ["Стоят", "Стоят с зажиганием", "Движутся с зажиганием", "Движутся"];
    const MotionStateyArray = [13, 6, 9, 4];

    const MotionStatelayout = {title:""};

    const MotionStateData = [{labels:MotionStatexArray, values:MotionStateyArray, hole:.66, type:"pie"}];

    Plotly.newPlot("MotionState", MotionStateData, MotionStatelayout);

    // Диаграмма состояние движения
    const ConnectionStatexArray = ["Не подключены", "Подключены"];
    const ConnectionStateyArray = [13, 4];

    const ConnectionStateLayout = {title:""};

    const ConnectionStateData = [{labels:ConnectionStatexArray, values:ConnectionStateyArray, hole:.66, type:"pie"}];

    Plotly.newPlot("ConnectionState", ConnectionStateData, ConnectionStateLayout);
});