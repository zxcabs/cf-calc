<script lang="ts">
    import { ceilTo } from "../utils/utils.ts";

    let v = $state(0);
    let ratio = $state(1.4);
    let carbonRation = $state(0.6);
    let resinRation = $state(0.4);

    let hardenerRation = $state(0.22);
    let resinCorrectionRation = $state(1.15);

    let totalWeight = $derived(v * ratio);
    let carbonWeight = $derived(totalWeight * carbonRation);
    let resinWeight = $derived(totalWeight * resinRation);
    let resinTotalWeightWithCorrection = $derived(
        resinWeight * resinCorrectionRation,
    );

    let resinWeightWithCorrection = $derived(
        resinTotalWeightWithCorrection * (1 - hardenerRation),
    );

    let hardenerWeightWithCrrection = $derived(
        resinTotalWeightWithCorrection * hardenerRation,
    );
</script>

<div>
    <h2>Расчет для кованного карбона</h2>
    <div>
        <div>Объем тела: <input bind:value={v} />смˆ3</div>
        <div>
            Коррекция смолы:
            <input bind:value={resinCorrectionRation} />
        </div>
    </div>

    <div>
        <h2>Предварительный расчет:</h2>
        <div>Вес готового изделия: {ceilTo(totalWeight, 2)}г</div>
        <div>Вес карбона: {ceilTo(carbonWeight, 2)}г</div>
        <div>Вес смолы: {ceilTo(resinWeight, 2)}г</div>
        <div>
            Вес смолы с избытком: {ceilTo(resinTotalWeightWithCorrection, 2)}г = {ceilTo(
                resinWeight,
                2,
            )}г * {resinCorrectionRation}
        </div>
    </div>

    <div>
        <h2>Итого:</h2>
        <div>
            <ul>
                <li>Карбон: {ceilTo(carbonWeight, 2)}г</li>
                <li>Смола: {ceilTo(resinWeightWithCorrection, 2)}г</li>
                <li>Отвердитель: {ceilTo(hardenerWeightWithCrrection, 2)}г</li>
            </ul>
        </div>
    </div>
</div>
