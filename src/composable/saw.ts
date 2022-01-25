import { saw, sawStore } from "~/stores/sawstore";
import { Preset } from "~/types";
import { Alternative } from "~/types/alternative";


export const calculateSaw = (alternatives: Array<Alternative>, preset: Preset) =>{
    const _saw = saw(alternatives, preset.criteria!)
    sawStore.setSaw(_saw);
    sawStore.calculateRank()
}
