import { Annotation } from "../types/schema";

export const CARD_SPACING = 16; // px
export const CARD_HEIGHT_ESTIMATE = 150; // px, fallback if not measured, but better to measure.
// Actually, we should probably measure card heights too if we want perfect non-overlap. 
// But for now, let's assume we align top, and push down if overlap. 
// We need to know previous card's height to know where it ends. 
// So the input should probably include card heights?
// Or we render them, measure them, then position them? 
// "Simple" version: just stacking flow if they overlap?
// Design: "Collision Detection: If current top < prev bottom + spacing, push down".
// This implies we DO need to know prev bottom, which means we need prev card height.

// Let's define the input more robustly.
export interface MeasuredAnnotation extends Annotation {
    measuredHeight?: number; // If we can measure it. If not, maybe just push by a fixed amount? 
    // Ideally we render them in a hidden state or use a heuristic.
    // For a "Google Docs" style, they usually just expand. 
    // Let's assume we can measure them or use a resize observer.
}

interface AlignmentResult {
    // Map annotation ID to top pixel value
    positions: Record<number, number>;
    // Total height of sidebar
    totalHeight: number;
}

/**
 * Calculates the absolute top position for each annotation card.
 * 
 * @param annotations Sorted list of annotations (by start_line_id)
 * @param linePositions Map of transcript line ID -> Top position (px)
 * @param cardHeights Map of annotation ID -> Height (px)
 */
export function calculateAnnotationPositions(
    annotations: Annotation[],
    linePositions: Record<number, number>,
    cardHeights: Record<number, number>
): AlignmentResult {
    const positions: Record<number, number> = {};
    let lastBottom = 0;

    // Ensure annotations are sorted by flow (start_line_id), then by ID
    const sorted = [...annotations].sort((a, b) => {
        const lineDiff = a.start_line_id - b.start_line_id;
        if (lineDiff !== 0) return lineDiff;
        return a.id - b.id;
    });

    for (const ann of sorted) {
        // 1. Initial Desired Top: Aligned with the transcript line
        const lineTop = linePositions[ann.start_line_id] || 0;

        let top = lineTop;

        // 2. Collision Detection
        // If this card's desired top is higher than the previous card's bottom + spacing,
        // we must push it down.
        if (top < lastBottom + CARD_SPACING) {
            top = lastBottom + CARD_SPACING;
        }

        // 3. Store position
        positions[ann.id] = top;

        // 4. Update lastBottom for next iteration
        const height = cardHeights[ann.id] || 100; // Fallback height if not measured yet
        lastBottom = top + height;
    }

    return { positions, totalHeight: lastBottom };
}
