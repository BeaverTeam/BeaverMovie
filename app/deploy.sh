echo "[WARNING] 请确保在 /prod 文件夹中存在文件 my-release-key.jks!"
echo "[WARNING] 脚本只适用于 macOS!"
echo "请输入 Android Studio 的版本："
read version
ionic cordova build android --prod --release
cp platforms/android/build/outputs/apk/android-release-unsigned.apk prod/
cd prod/
rm BeaverMovie.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks android-release-unsigned.apk beaver-movie
~/Library/Android/sdk/build-tools/$version/zipalign -v 4 android-release-unsigned.apk BeaverMovie.apk
~/Library/Android/sdk/build-tools/$version/apksigner verify BeaverMovie.apk
