class World {
    constructor(gridSize = 50) {
        this.gridSize = gridSize;
        this.rectSize = width / gridSize;
        this.buffer_size = gridSize * gridSize;
        this.buffer_new = new Array(this.buffer_size).fill(0);
        this.buffer_old = this.buffer_new.slice(); // slice used for copy an array
        this.paused = false;
        this.neighboursCoords = [+this.gridSize, -this.gridSize, +1, -1];
        this.magic = 0.04;
    }

    add(x, y, value) {
        this.buffer_new[x + this.gridSize * y] += value;
    }

    update() {
        if (this.paused) return;
        for (let i = 0; i < this.buffer_size; ++i) {
            const div = this.buffer_old[i] / this.neighboursCoords.length;
            if (div >= this.magic) {
                this.buffer_new[i] = 0;
                for (let coord of this.neighboursCoords) {
                    let index = i + coord;
                    if (index > this.buffer_size) index -= this.buffer_size;
                    else if (index < 0) index += this.buffer_size;
                    this.buffer_new[index] += div;
                }
            }
        }
        this.buffer_old = this.buffer_new.slice();
    }

    draw() {
        background("#8C92AC");
        for (let i = 0; i < this.buffer_size; ++i) {
            const value = this.buffer_new[i];
            if (value > 0) {
                const x = i % this.gridSize;
                const y = floor(i / this.gridSize);
                fill(value * 60, 100, 100);
                rect(
                    x * this.rectSize,
                    y * this.rectSize,
                    this.rectSize,
                    this.rectSize
                );
            }
        }
    }

    fill(value) {
        this.buffer_new.fill(value);
        this.buffer_old.fill(value);
    }

    fillRandom() {
        for (let i = 0; i < this.buffer_size; ++i) {
            this.buffer_new[i] = random(0.0, 2.0);
        }
        this.buffer_old = this.buffer_new.slice();
    }

    pause() {
        this.paused = !this.paused;
    }
}