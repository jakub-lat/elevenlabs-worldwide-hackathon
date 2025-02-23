def tts(text):
    from elevenlabs import ElevenLabs
    import os
    from dotenv import load_dotenv
    
    # Load environment variables
    load_dotenv()
    
    # Get API key from environment
    api_key = os.getenv('ELEVENLABS_API_KEY')
    
    try:
        # Initialize ElevenLabs client
        client = ElevenLabs(api_key=api_key)
        
        # Generate audio from text
        audio = client.text_to_speech.convert(
            text=text,
            voice_id="i8yKObbsUKqDEXllicpF",  # Your selected voice ID
            model_id="eleven_flash_v2_5",
            output_format="mp3_44100_128"
        )
        
        # Convert generator to bytes
        print("converting audio to bytes")
        audio_bytes = b"".join(audio)
        print("audio bytes done")
        return audio_bytes  # Returns binary audio data in mp3 format
        
    except Exception as e:
        print(f"Error generating TTS: {str(e)}")
        return None

