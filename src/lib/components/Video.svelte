<script lang="ts">
	import Icon from '@iconify/svelte';
	export let data: import('ytdl-core').videoInfo;
	import { fade, slide } from 'svelte/transition';
	let tab: 'audio' | 'video' = 'video';
	const audios = data.formats.filter((val) => val.mimeType?.includes('audio'));
	const videos = data.formats.filter((val) => val.mimeType?.includes('video'));
	console.log(data);
</script>

<div transition:slide class="mt-10 flex justify-center items-center flex-col gap-5">
	<section class="flex flex-col gap-2">
		<img
			class="aspect-video max-w-[400px] rounded-xl object-contain"
			src={data.videoDetails.thumbnails.at(-1)?.url}
			alt="thumbnail"
		/>
		<section>
			<h3 class="font-bold">{data.videoDetails.title}</h3>
			<a
				rel="noopener noreferrer"
				class="underline text-blue-500"
				href={data.videoDetails.video_url}
				target="_blank">{data.videoDetails.video_url}</a
			>
		</section>
	</section>
	<section class="flex gap-5 text-xl">
		<button
			on:click={() => {
				tab = 'video';
			}}
			class="p-2 rounded-lg gap-2 flex items-center justify-between"
			class:bg-blue-500={tab === 'video'}
			class:font-bold={tab === 'video'}
			class:text-white={tab === 'video'}
		>
			<Icon icon="mdi:video" />
			Video</button
		>
		<button
			on:click={() => {
				tab = 'audio';
			}}
			class:bg-blue-500={tab === 'audio'}
			class:text-white={tab === 'audio'}
			class:font-bold={tab === 'audio'}
			class="p-2 rounded-lg gap-2 flex items-center justify-between"
		>
			<Icon icon="mdi:audio" />
			Audio</button
		>
	</section>
	<section class="flex gap-5 flex-wrap">
		{#if tab === 'video'}
			{#each videos as format}
				<a href={format.url} target="_blank">
					<button transition:fade class="bg-blue-600 text-white p-2 rounded-lg">
						{format.qualityLabel}
						<!-- {format.} -->
					</button>
				</a>
			{/each}
		{:else}
			{#each audios as format}
				<a href={format.url} target="_blank">
					<button transition:fade class="bg-blue-600 text-white p-2 rounded-lg">
						{format.container}
					</button>
				</a>
			{/each}
		{/if}
	</section>
</div>
