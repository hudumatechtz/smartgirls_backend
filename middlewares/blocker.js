module.exports = (req, res, next) => {
//   res.writeHead(200, { "Content-Type": "text/html" });
  res.send(`
    <div style="width: 100%; margin: 0; color: red; text-align:center">
        <h2 style="margin-top:7vh">SITE OFFLINE</h2>
        <br>
        <h4 style="color: black">${new Date().toLocaleTimeString()}</h4>
    </div>
  `);
//   res.end();
};
