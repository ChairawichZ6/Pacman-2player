export default class CirclePlayer {
    constructor(x, y, radius, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.tileMap = tileMap;
    }

    // Replace the draw method to draw a circle
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "red"; // You can set the color for player 1
        ctx.fill();
        ctx.closePath();
    }

    // Update method remains the same
    update() {
        // Update player's position based on velocity
    }
}
