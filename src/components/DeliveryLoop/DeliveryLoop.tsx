import { useCallback, useEffect, useId, useState } from 'react';
import Icon from '../Icon';
import type { LoopStage } from '../../types';

export interface DeliveryLoopProps {
  title: string;
  stages: LoopStage[];
  /** Sentence shown after the last stage, describing how the loop closes. */
  closing: string;
  runLabel: string;
  rerunLabel: string;
  stopLabel: string;
  /** Time each stage stays lit while the loop runs. */
  stepMs?: number;
}

/**
 * The delivery loop. Each stage opens to show the belief behind it, and
 * "Run the loop" steps through the stages in order.
 */
const DeliveryLoop = ({
  title,
  stages,
  closing,
  runLabel,
  rerunLabel,
  stopLabel,
  stepMs = 1400,
}: DeliveryLoopProps) => {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);

  // While running, move to the next stage after each pause; finish after the last one.
  useEffect(() => {
    if (!running || activeIndex === null) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (activeIndex < stages.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setRunning(false);
        setActiveIndex(null);
        setRounds((count) => count + 1);
      }
    }, stepMs);
    return () => window.clearTimeout(timer);
  }, [running, activeIndex, stages.length, stepMs]);

  const handleRunToggle = useCallback(() => {
    if (running) {
      setRunning(false);
      return;
    }
    setActiveIndex(0);
    setRunning(true);
  }, [running]);

  const handleStageClick = useCallback((index: number) => {
    setRunning(false);
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  const justFinished = !running && activeIndex === null && rounds > 0;

  return (
    <figure
      className={`loop${activeIndex !== null ? ' has-active' : ''}`}
      data-testid="delivery-loop"
    >
      <figcaption className="loop__title">{title}</figcaption>

      <ol>
        {stages.map((stage, index) => {
          const isActive = activeIndex === index;
          const detailId = `${baseId}-detail-${stage.id}`;

          return (
            <li key={stage.id} className={`loop__stage${isActive ? ' is-active' : ''}`}>
              <button
                type="button"
                className="loop__toggle"
                onClick={() => handleStageClick(index)}
                aria-expanded={isActive}
                aria-controls={detailId}
                data-testid={`loop-stage-${stage.id}`}
              >
                <span className="loop__name">{stage.name}</span>
                <span className="loop__change">{stage.change}</span>
              </button>
              <div id={detailId}>
                {isActive ? <p className="loop__detail">{stage.detail}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <p className={`loop__closing${justFinished ? ' is-done' : ''}`}>
        <Icon name="loop" />
        {closing}
      </p>

      <button
        type="button"
        className="button button--loop loop__run"
        onClick={handleRunToggle}
        data-testid="loop-run"
      >
        <Icon name={running ? 'stop' : 'play'} />
        {running ? stopLabel : rounds > 0 ? rerunLabel : runLabel}
      </button>

      {/* Announces the stage as the loop runs, for screen reader users. */}
      <div className="visually-hidden" role="status" aria-live="polite">
        {running && activeIndex !== null ? stages[activeIndex].name : ''}
      </div>
    </figure>
  );
};

export default DeliveryLoop;
