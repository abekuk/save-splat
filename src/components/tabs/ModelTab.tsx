import { LAMBDA, halfLife } from '@/core/ranking';

export default function ModelTab() {
  return (
    <>
      <div className="h">SURVIVAL DECAY</div>
      <p>
        Survival probability for entrapped victims decays approximately exponentially. Expected lives
        saved by dispatching a crew to site <i>i</i> at time <i>t</i>:
      </p>
      <div className="formula">
        V<sub>i</sub>(t) = n<sub>i</sub> · q<sub>i</sub> · r<sub>i</sub> · e<sup>−λ<sub>i</sub> t</sup>
      </div>

      <div className="h">GREEDY INDEX RULE</div>
      <p>
        Optimal scheduling of <i>K</i> crews across competing sites is NP-hard. Rank descending by
        expected lives per crew-hour, weighted by urgency:
      </p>
      <div className="formula">
        ρ<sub>i</sub> = ( n<sub>i</sub> · q<sub>i</sub> · r<sub>i</sub> · λ<sub>i</sub> ) / τ<sub>i</sub>
      </div>
      <p>
        The denominator is guarded at 0.1 crew-hours, so a slider at minimum cannot divide by zero.
        Confidence is an evidence flag and is deliberately absent from ρ.
      </p>

      <div className="h">λ BY COLLAPSE TYPE</div>
      <table className="lam">
        <tbody>
          <tr><th>TYPE</th><th>λ (/hour)</th><th>VOID CHARACTER</th></tr>
          <tr>
            <td>PANCAKE</td><td className="n">{LAMBDA.pancake.toFixed(2)}</td>
            <td>Slabs stacked flat; voids scarce, crush loads high</td>
          </tr>
          <tr>
            <td>MIXED</td><td className="n">{LAMBDA.mixed.toFixed(2)}</td>
            <td>Partial pancake with surviving structure</td>
          </tr>
          <tr>
            <td>LEAN-TO</td><td className="n">{LAMBDA.lean.toFixed(2)}</td>
            <td>Slab resting on a wall or debris; large stable voids</td>
          </tr>
        </tbody>
      </table>
      <p>
        Half-life of survival probability is ln 2 / λ: about{' '}
        <b>{halfLife('pancake').toFixed(1)} h</b> for pancake,{' '}
        <b>{halfLife('mixed').toFixed(1)} h</b> for mixed,{' '}
        <b>{halfLife('lean').toFixed(1)} h</b> for lean-to.
      </p>

      <div className="h">LIMITS</div>
      <ul className="lim">
        <li>
          A splat scan captures <b>exterior surfaces</b>. Survivable voids are <b>interior</b>. The
          scan tells you where a structure failed and how, not where anyone is.
        </li>
        <li>
          <b>Occupancy is not geometric.</b> n is a human estimate entered by the operator; it
          dominates ρ linearly and is the largest source of error in the ranking.
        </li>
        <li>
          The point cloud is a render of the splat, not a true Gaussian rasterization — small
          features and thin voids will be under-represented.
        </li>
        <li>
          A/B scan slots are a <b>visual toggle only</b>. There is no alignment, registration, or
          geometric change detection between them.
        </li>
        <li>No metric scale calibration by default. Distances are in scan units until you set the scale.</li>
      </ul>
      <div className="warn">
        Output is a <b>ranked prior for incident command review</b>. It is not an autonomous dispatch
        order. Every value in ρ is an operator estimate; the ordering is only as good as those
        estimates.
      </div>
    </>
  );
}
