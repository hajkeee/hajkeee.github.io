var particles;

particles = Particles.init({
  selector: ".background",
  color: ["#DA0463", "#404B69", "#DBEDF3"],
  connectParticles: true,
  speed: 5
});

function pause() {
  particles.pauseAnimation();
}

function resume() {
  particles.resumeAnimation();
}