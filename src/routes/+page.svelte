<script lang="ts">
	import { trpc } from '$lib/trpc';
	import Video from '$lib/components/Video.svelte';
	import Icon from '@iconify/svelte';
	import type { videoInfo } from 'ytdl-core';
	import { onMount } from 'svelte';
	let submitting = false;
	let video: videoInfo | undefined;
	async function getURLS(ev: Event) {
		submitting = true;
		video = undefined;
		try {
			const formData = new FormData(ev.target as HTMLFormElement);
			if (formData.has('url')) {
				video = (await trpc.getVideoInfo.query({
					url: formData.get('url')?.toString() ?? ''
				})) as videoInfo;
			}
		} catch (error) {
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="max-w-screen-2xl p-2 mx-auto">
	<section>
		<h1 class="font-bold my-10 text-xl mt-10">Youtube Downloader</h1>
		<form on:submit|preventDefault={getURLS} class="flex gap-5 justify-between items-center">
			<input
				disabled={submitting}
				name="url"
				class="grow text-xl focus:outline-none border rounded-md p-2"
				type="text"
				placeholder="Enter url.."
			/>
			<button disabled={submitting} class="">
				<Icon icon="mdi:search" class="text-4xl" />
			</button>
		</form>
	</section>
	<section class="grid place-items-center">
		{#if submitting}
			<h1>Getting Video Information</h1>
		{:else if video}
			<Video data={video} />
		{/if}
	</section>
</main>
