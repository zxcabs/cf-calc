<script lang="ts">
    import { ceilTo } from '../utils/utils'

    let hardenerRation = $state(0.22)
    let resinCorrectionRation = $state(1.15)
    let carbonResinRation = $state(40 / 60)

    let layers = $state([
        {
            s: 1,
            p: 240,
            count: 1,
        },
    ])

    let carbonWeight = $derived.by(() => {
        if (!layers.length) return 0

        return ceilTo(
            layers.reduce((sum, { s, p, count }) => sum + s * p * count, 0),
            6,
        )
    })

    let resinTotalWeight = $derived(ceilTo(carbonWeight * carbonResinRation, 3))
    let resinTotalWeightWithCorrection = $derived(ceilTo(resinTotalWeight * resinCorrectionRation, 3))
    let resinWeight = $derived(ceilTo(resinTotalWeightWithCorrection * (1 - hardenerRation), 3))
    let hardenerWeight = $derived(ceilTo(resinTotalWeightWithCorrection * hardenerRation, 3))

    function removeLayer(layer: { s: number; p: number; count: number }) {
        layers = layers.filter(l => l !== layer)
    }

    function addLayer() {
        layers = [
            ...layers,
            {
                s: 1,
                p: 240,
                count: 1,
            },
        ]
    }
</script>

<div>
    <h2>Расчет для инфузии</h2>
    <div>
        <div>
            Коррекция смолы:
            <input bind:value={resinCorrectionRation} />
        </div>

        <h2>Слои:</h2>

        <ol>
            {#each layers as layer}
                <li>
                    <div>Площадь слоя: <input bind:value={layer.s} /> мˆ2</div>
                    <div>Плотность: <input bind:value={layer.p} /> г/мˆ2</div>
                    <div>
                        Количество слоев: <input type="number" min="1" bind:value={layer.count} />
                    </div>
                    <button onclick={() => removeLayer(layer)}>Удалить</button>
                </li>
            {/each}
        </ol>

        <button onclick={addLayer}>Добавить слой</button>
    </div>
    <div>
        <h2>Итого:</h2>
        <div>
            Вес карбона: {carbonWeight}г
        </div>
        <div>
            Вес смолы: {resinTotalWeightWithCorrection}г = {resinTotalWeight}г * {resinCorrectionRation}
        </div>
        <div>
            Смола: {resinWeight}г Отвердитель: {hardenerWeight}г
        </div>
    </div>
</div>
