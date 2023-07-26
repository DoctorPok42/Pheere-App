import {Howl, Howler} from 'howler';

interface VoiceProps {
    fullSpeech: string;
    elevenToken: string;
}

const Voice = async ({ fullSpeech, elevenToken }: VoiceProps) => {
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        body: JSON.stringify({
          fullSpeech,
          elevenToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res: any) => {
        if (res.status === 200) {
            const sound = new Howl({
                src: ['test.mp3'],
                autoplay: true,
                loop: false,
                onend: function () {
                    console.log('Finished!');

                    sound.unload();
                },
                onplayerror: function () {
                    console.log('Error! Can not play audio file');
                },
                onloaderror: function () {
                    console.log('Error! Can not load audio file');
                },
                onplay: function () {
                    console.log('Play!');
                }
            });


            Howler.volume(1.0);
            sound.play();
        }
        });

    } catch (error) {
        console.log("Can't get voice")
    }
    return
}

export default Voice