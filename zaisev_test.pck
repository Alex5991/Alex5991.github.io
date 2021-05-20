GDPC                                                                               <   res://.import/icon.png-487276ed1e3a0c39cad0279d744ee560.stexP      U      -��`�0��x�5�[   res://HBoxContainer.tscnP      ;      ����2�	�}@��T   res://ScrollContainer.tscn  �            �E��*�0�D�$K9��   res://default_env.tres  �      �       um�`�N��<*ỳ�8   res://icon.png  0.      �      G1?��z�c��vN��   res://icon.png.import   �      �      �����%��(#AB�   res://main.tscn 0      �      ����u9���   res://project.binary ;      �      F�.�4x�X��$ڞ�    [gd_scene load_steps=2 format=2]

[sub_resource type="GDScript" id=1]
script/source = "extends HBoxContainer

func _initial(num:int):
	while num:
		var labl = Label.new()
		labl.text = \"0\"
		labl.name = str(num)
		add_child(labl)
		num -= 1

func _set_label(num:int):
	var node = get_node_or_null(str(num))
	if node:
		node.text = str(1)

func _set_red():
	for c in get_children():
		c.modulate = Color.red
"

[node name="HBoxContainer" type="HBoxContainer"]
margin_right = 56.0
margin_bottom = 14.0
script = SubResource( 1 )
__meta__ = {
"_edit_use_anchors_": false
}
     [gd_scene format=2]

[node name="ScrollContainer" type="ScrollContainer"]
anchor_right = 1.0
anchor_bottom = 1.0
size_flags_horizontal = 3
size_flags_vertical = 3
__meta__ = {
"_edit_use_anchors_": false
}

[node name="VBoxContainer" type="VBoxContainer" parent="."]
     [gd_resource type="Environment" load_steps=2 format=2]

[sub_resource type="ProceduralSky" id=1]

[resource]
background_mode = 2
background_sky = SubResource( 1 )
             GDST@   @           9  PNG �PNG

   IHDR   @   @   �iq�   sRGB ���  �IDATx�ݜytTU��?��WK*�=���%�  F����0N��݂:���Q�v��{�[�����E�ӋH���:���B�� YHB*d_*�jyo�(*M�JR!h��S�T��w�߻���ro���� N�\���D�*]��c����z��D�R�[�
5Jg��9E�|JxF׵'�a���Q���BH�~���!����w�A�b
C1�dB�.-�#��ihn�����u��B��1YSB<%�������dA�����C�$+(�����]�BR���Qsu][`
�DV����у�1�G���j�G͕IY! L1�]��� +FS�IY!IP ��|�}��*A��H��R�tQq����D`TW���p\3���M���,�fQ����d��h�m7r�U��f������.��ik�>O�;��xm��'j�u�(o}�����Q�S�-��cBc��d��rI�Ϛ�$I|]�ơ�vJkZ�9>��f����@EuC�~�2�ym�ش��U�\�KAZ4��b�4������;�X婐����@Hg@���o��W�b�x�)����3]j_��V;K����7�u����;o�������;=|��Ŗ}5��0q�$�!?��9�|�5tv�C�sHPTX@t����w�nw��۝�8�=s�p��I}�DZ-̝�ǆ�'�;=����R�PR�ۥu���u��ǻC�sH`��>�p�P ���O3R�������۝�SZ7 �p��o�P!�
��� �l��ހmT�Ƴێ�gA��gm�j����iG���B� ܦ(��cX�}4ۻB��ao��"����� ����G�7���H���æ;,NW?��[��`�r~��w�kl�d4�������YT7�P��5lF�BEc��=<�����?�:]�������G�Μ�{������n�v��%���7�eoݪ��
�QX¬)�JKb����W�[�G ��P$��k�Y:;�����{���a��&�eפ�����O�5,;����yx�b>=fc�* �z��{�fr��7��p���Ôִ�P����t^�]͑�~zs.�3����4��<IG�w�e��e��ih�/ˆ�9�H��f�?����O��.O��;!��]���x�-$E�a1ɜ�u�+7Ȃ�w�md��5���C.��\��X��1?�Nغ/�� ��~��<:k?8��X���!���[���꩓��g��:��E����>��꩓�u��A���	iI4���^v:�^l/;MC��	iI��TM-$�X�;iLH���;iI1�Zm7����P~��G�&g�|BfqV#�M������%��TM��mB�/�)����f����~3m`��������m�Ȉ�Ƽq!cr�pc�8fd���Mۨkl�}P�Л�汻��3p�̤H�>+���1D��i�aۡz�
������Z�Lz|8��.ִQ��v@�1%&���͏�������m���KH�� �p8H�4�9����/*)�aa��g�r�w��F36���(���7�fw����P��&�c����{﹏E7-f�M�).���9��$F�f r �9'1��s2).��G��{���?,�
�G��p�µ�QU�UO�����>��/�g���,�M��5�ʖ�e˃�d����/�M`�=�y=�����f�ӫQU�k'��E�F�+ =΂���
l�&���%%�������F#KY����O7>��;w���l6***B�g)�#W�/�k2�������TJ�'����=!Q@mKYYYdg��$Ib��E�j6�U�,Z�鼌Uvv6YYYԶ��}( ���ߠ#x~�s,X0�����rY��yz�	|r�6l����cN��5ϑ��KBB���5ϡ#xq�7�`=4A�o�xds)�~wO�z�^��m���n�Ds�������e|�0�u��k�ٱ:��RN��w�/!�^�<�ͣ�K1d�F����:�������ˣ����%U�Ą������l{�y����)<�G�y�`}�t��y!��O@� A� Y��sv:K�J��ՎۣQ�܃��T6y�ǯ�Zi
��<�F��1>�	c#�Ǉ��i�L��D�� �u�awe1�e&')�_�Ǝ^V�i߀4�$G�:��r��>h�hݝ������t;)�� &�@zl�Ұր��V6�T�+����0q��L���[t���N&e��Z��ˆ/����(�i啝'i�R�����?:
P].L��S��E�݅�Á�.a6�WjY$F�9P�«����V^7���1Ȓ� �b6�(����0"�k�;�@MC���N�]7 �)Q|s����QfdI���5 ��.f��#1���G���z���>)�N�>�L0T�ۘ5}��Y[�W뿼mj���n���S?�v��ْ|.FE"=�ߑ��q����������p����3�¬8�T�GZ���4ݪ�0�L�Y��jRH��.X�&�v����#�t��7y_#�[�o��V�O����^�����paV�&J�V+V��QY����f+m��(�?/������{�X��:�!:5�G�x���I����HG�%�/�LZ\8/����yLf�Æ>�X�Єǣq���$E������E�Ǣ�����gێ��s�rxO��x孏Q]n���LH����98�i�0==���O$5��o^����>6�a� �*�)?^Ca��yv&���%�5>�n�bŜL:��y�w���/��o�褨A���y,[|=1�VZ�U>,?͑���w��u5d�#�K�b�D�&�:�����l~�S\���[CrTV�$����y��;#�������6�y��3ݸ5��.�V��K���{�,-ւ� k1aB���x���	LL� ����ңl۱������!U��0L�ϴ��O\t$Yi�D�Dm��]|�m���M�3���bT�
�N_����~uiIc��M�DZI���Wgkn����C��!xSv�Pt�F��kڨ��������OKh��L����Z&ip��
ޅ���U�C�[�6��p���;uW8<n'n��nͽQ�
�gԞ�+Z	���{���G�Ĭ� �t�]�p;躆 ��.�ۣ�������^��n�ut�L �W��+ ���hO��^�w�\i� ��:9>3�=��So�2v���U1z��.�^�ߋěN���,���� �f��V�    IEND�B`�           [remap]

importer="texture"
type="StreamTexture"
path="res://.import/icon.png-487276ed1e3a0c39cad0279d744ee560.stex"
metadata={
"vram_texture": false
}

[deps]

source_file="res://icon.png"
dest_files=[ "res://.import/icon.png-487276ed1e3a0c39cad0279d744ee560.stex" ]

[params]

compress/mode=0
compress/lossy_quality=0.7
compress/hdr_mode=0
compress/bptc_ldr=0
compress/normal_map=0
flags/repeat=0
flags/filter=true
flags/mipmaps=false
flags/anisotropic=false
flags/srgb=2
process/fix_alpha_border=true
process/premult_alpha=false
process/HDR_as_SRGB=false
process/invert_color=false
stream=false
size_limit=0
detect_3d=true
svg/scale=1.0
[gd_scene load_steps=2 format=2]

[sub_resource type="GDScript" id=1]
script/source = "extends CanvasLayer

# 10110


func _ready():
	pass
	
#
#	var y_count = 0
#	while true:
#		break
#	for nul in nuls:
#		var scroll_scene = scroll_node.instance()
#		$MarginContainer/HBoxContainer.add_child(scroll_scene)
#		var fin_arr = []
#		var array_for_delete = []
#
#		for x in array:
#			var ne_sovpal = 0
#			var tmp = _num_in_bit_arr(x)
#			for bit in _num_in_bit_arr(nul):
#				# Если нашел
#				if tmp.find(bit) != -1:
#					tmp.remove(tmp.find(bit))
#				else:
#					ne_sovpal += 1
#			ne_sovpal += tmp.size()
#			#print(ne_sovpal)
#			if ne_sovpal <= er and fin_arr.size() < _y:
#				array_for_delete.push_back(x)
#				y_count += 1
#				fin_arr.push_back(x)
#
#				for ad in array_for_delete:
#					if array.find(ad) != -1:
#						array.remove(array.find(ad))
#				break
#
#
#			if fin_arr.size() == _y:
#				break
#			else:
#				er += 1
#
#		for x in fin_arr:
#			print(x, ' --- num')
#			var scene = node.instance()
#			if x in nuls:
#				scene._set_red()
#			scroll_scene.get_node(\"VBoxContainer\").add_child(scene)
#			for b in _num_in_bit_arr(x):
#
#				scene._set_label(b)
			
			
				
	



func _num_in_bit_arr(num:int):
	var tmp = num
	var coun = 0
	var arr_bit = []
	while true:
		while tmp > 0:
			tmp = tmp >> 1
			coun += 1
		if coun == 0:
			break
		else:
			arr_bit.push_back(coun)
			num -= _stepen(2,coun-1)
			
			tmp = num
			coun = 0
	
	for x in arr_bit:
		#print(x)
		pass
	return arr_bit


func _set_int(count_bit:int):
	var sum:int = 0
	while count_bit:
		sum += _stepen(2,count_bit-1)
		count_bit -= 1
	return sum


func _stepen(num:int, step:int):
	if step == 0:
		return 1
	else:
		var sum:int = 1
		while step:
			sum *= num
			step -= 1
		return sum


func _on_Button_pressed():
	$MarginContainer2.hide()
# 0,9,18,27
# 0,30,45,51,75,85,102,120,135,153,170,180,204,210,225,255
	var num = int($MarginContainer2/VBoxContainer/HBoxContainer/TextEdit2.text)
	var limit = _set_int(num)
	
	var array = []
	while limit + 1:
		array.push_back(limit)
		limit -= 1
		
	# print(array.size())
	# _differ(array, 1)
	#_num_in_bit_arr(6)
	var text = $MarginContainer2/VBoxContainer/HBoxContainer2/TextEdit2.text
	
	#var nuls = [0, 9, 18, 27]
	var nuls = []
	for t in text.split(\",\"):
		nuls.push_back(int(t))
	 
	print(nuls)
	
#	array = [1]
	
	var scroll_node = load(\"res://ScrollContainer.tscn\")
	var node = load(\"res://HBoxContainer.tscn\")
	
	var nodes = {}
	for x in nuls:
		if array.find(x) != -1:
			array.remove(array.find(x))
			var scene = scroll_node.instance()
			$MarginContainer/HBoxContainer.add_child(scene)
			# nodes.push_back(scene)
			nodes[x] = scene
			scene.modulate = Color(rand_range(0, 1),rand_range(0, 1),rand_range(0, 1),1)
			
			var scene_label = node.instance()
			scene_label._initial(num)
			scene.get_node(\"VBoxContainer\").add_child(scene_label)
			scene_label._set_red()
			for b in _num_in_bit_arr(x):
				scene_label._set_label(b)
	
	while !array.empty():
		for nul in nuls:
			var er = 1
			while true:
				var flag = false
				for x in array:
					var ne_sovpal = 0
					var tmp = _num_in_bit_arr(x)
					for bit in _num_in_bit_arr(nul):
						# Если нашел
						if tmp.find(bit) != -1:
							tmp.remove(tmp.find(bit))
						else:
							ne_sovpal += 1
						
					ne_sovpal += tmp.size()
					#print(ne_sovpal)
					if ne_sovpal <= er:
						var scene_label = node.instance()
						scene_label._initial(num)
						nodes[nul].get_node(\"VBoxContainer\").add_child(scene_label)
						for b in _num_in_bit_arr(x):
							scene_label._set_label(b)
						
						
						array.remove(array.find(x))
						flag = true
						break
				
				if flag or array.empty():
					break
				else:
					er += 1
	print(\"size = \", array.size())
"

[node name="CanvasLayer" type="CanvasLayer"]
script = SubResource( 1 )

[node name="MarginContainer" type="MarginContainer" parent="."]
anchor_right = 1.0
anchor_bottom = 1.0
__meta__ = {
"_edit_use_anchors_": false
}

[node name="HBoxContainer" type="HBoxContainer" parent="MarginContainer"]
margin_right = 1024.0
margin_bottom = 600.0

[node name="MarginContainer2" type="MarginContainer" parent="."]
anchor_right = 1.0
anchor_bottom = 1.0
__meta__ = {
"_edit_use_anchors_": false
}

[node name="VBoxContainer" type="VBoxContainer" parent="MarginContainer2"]
margin_right = 1024.0
margin_bottom = 600.0

[node name="Label" type="Label" parent="MarginContainer2/VBoxContainer"]
margin_top = -1.0
margin_right = 1024.0
margin_bottom = 49.0
rect_min_size = Vector2( 0, 50 )
text = "enter the initial values
example: [0,9,18,27]"
align = 1
valign = 1

[node name="HBoxContainer" type="HBoxContainer" parent="MarginContainer2/VBoxContainer"]
margin_top = 54.0
margin_right = 1024.0
margin_bottom = 74.0
rect_min_size = Vector2( 0, 20 )

[node name="Label" type="Label" parent="MarginContainer2/VBoxContainer/HBoxContainer"]
margin_top = 3.0
margin_right = 24.0
margin_bottom = 17.0
text = "n = "

[node name="TextEdit2" type="TextEdit" parent="MarginContainer2/VBoxContainer/HBoxContainer"]
margin_left = 28.0
margin_right = 1024.0
margin_bottom = 20.0
size_flags_horizontal = 3
size_flags_vertical = 3
text = "8"

[node name="HBoxContainer2" type="HBoxContainer" parent="MarginContainer2/VBoxContainer"]
margin_top = 78.0
margin_right = 1024.0
margin_bottom = 98.0
rect_min_size = Vector2( 0, 20 )

[node name="Label" type="Label" parent="MarginContainer2/VBoxContainer/HBoxContainer2"]
margin_top = 3.0
margin_right = 97.0
margin_bottom = 17.0
text = "initial values = "

[node name="TextEdit2" type="TextEdit" parent="MarginContainer2/VBoxContainer/HBoxContainer2"]
margin_left = 101.0
margin_right = 1024.0
margin_bottom = 20.0
size_flags_horizontal = 3
size_flags_vertical = 3
text = "0,30,45,51,75,85,102,120,135,153,170,180,204,210,225,255"

[node name="Button" type="Button" parent="MarginContainer2/VBoxContainer"]
margin_top = 102.0
margin_right = 1024.0
margin_bottom = 202.0
rect_min_size = Vector2( 0, 100 )
text = "Go"
[connection signal="pressed" from="MarginContainer2/VBoxContainer/Button" to="." method="_on_Button_pressed"]
 �PNG

   IHDR   @   @   �iq�   sRGB ���  �IDATx��ytTU��?�ի%���@ȞY1JZ �iA�i�[P��e��c;�.`Ow+4�>�(}z�EF�Dm�:�h��IHHB�BR!{%�Zߛ?��	U�T�
���:��]~�������-�	Ì�{q*�h$e-
�)��'�d�b(��.�B�6��J�ĩ=;���Cv�j��E~Z��+��CQ�AA�����;�.�	�^P	���ARkUjQ�b�,#;�8�6��P~,� �0�h%*QzE� �"��T��
�=1p:lX�Pd�Y���(:g����kZx ��A���띊3G�Di� !�6����A҆ @�$JkD�$��/�nYE��< Q���<]V�5O!���>2<��f��8�I��8��f:a�|+�/�l9�DEp�-�t]9)C�o��M~�k��tw�r������w��|r�Ξ�	�S�)^� ��c�eg$�vE17ϟ�(�|���Ѧ*����
����^���uD�̴D����h�����R��O�bv�Y����j^�SN֝
������PP���������Y>����&�P��.3+�$��ݷ�����{n����_5c�99�fbסF&�k�mv���bN�T���F���A�9�
(.�'*"��[��c�{ԛmNު8���3�~V� az
�沵�f�sD��&+[���ke3o>r��������T�]����* ���f�~nX�Ȉ���w+�G���F�,U�� D�Դ0赍�!�B�q�c�(
ܱ��f�yT�:��1�� +����C|��-�T��D�M��\|�K�j��<yJ, ����n��1.FZ�d$I0݀8]��Jn_� ���j~����ցV���������1@M�)`F�BM����^x�>
����`��I�˿��wΛ	����W[�����v��E�����u��~��{R�(����3���������y����C��!��nHe�T�Z�����K�P`ǁF´�nH啝���=>id,�>�GW-糓F������m<P8�{o[D����w�Q��=N}�!+�����-�<{[���������w�u�L�����4�����Uc�s��F�륟��c�g�u�s��N��lu���}ן($D��ת8m�Q�V	l�;��(��ڌ���k�
s\��JDIͦOzp��مh����T���IDI���W�Iǧ�X���g��O��a�\:���>����g���%|����i)	�v��]u.�^�:Gk��i)	>��T@k{'	=�������@a�$zZ�;}�󩀒��T�6�Xq&1aWO�,&L�cřT�4P���g[�
p�2��~;� ��Ҭ�29�xri� ��?��)��_��@s[��^�ܴhnɝ4&'
��NanZ4��^Js[ǘ��2���x?Oܷ�$��3�$r����Q��1@�����~��Y�Qܑ�Hjl(}�v�4vSr�iT�1���f������(���A�ᥕ�$� X,�3'�0s����×ƺk~2~'�[�ё�&F�8{2O�y�n�-`^/FPB�?.�N�AO]]�� �n]β[�SR�kN%;>�k��5������]8������=p����Ցh������`}�
�J�8-��ʺ����� �fl˫[8�?E9q�2&������p��<�r�8x� [^݂��2�X��z�V+7N����V@j�A����hl��/+/'5�3�?;9
�(�Ef'Gyҍ���̣�h4RSS� ����������j�Z��jI��x��dE-y�a�X�/�����:��� +k�� �"˖/���+`��],[��UVV4u��P �˻�AA`��)*ZB\\��9lܸ�]{N��礑]6�Hnnqqq-a��Qxy�7�`=8A�Sm&�Q�����u�0hsPz����yJt�[�>�/ޫ�il�����.��ǳ���9��
_
��<s���wT�S������;F����-{k�����T�Z^���z�!t�۰؝^�^*���؝c
���;��7]h^
��PA��+@��gA*+�K��ˌ�)S�1��(Ե��ǯ�h����õ�M�`��p�cC�T")�z�j�w��V��@��D��N�^M\����m�zY��C�Ҙ�I����N�Ϭ��{�9�)����o���C���h�����ʆ.��׏(�ҫ���@�Tf%yZt���wg�4s�]f�q뗣�ǆi�l�⵲3t��I���O��v;Z�g��l��l��kAJѩU^wj�(��������{���)�9�T���KrE�V!�D���aw���x[�I��tZ�0Y �%E�͹���n�G�P�"5FӨ��M�K�!>R���$�.x����h=gϝ�K&@-F��=}�=�����5���s �CFwa���8��u?_����D#���x:R!5&��_�]���*�O��;�)Ȉ�@�g�����ou�Q�v���J�G�6�P�������7��-���	պ^#�C�S��[]3��1���IY��.Ȉ!6\K�:��?9�Ev��S]�l;��?/� ��5�p�X��f�1�;5�S�ye��Ƅ���,Da�>�� O.�AJL(���pL�C5ij޿hBƾ���ڎ�)s��9$D�p���I��e�,ə�+;?�t��v�p�-��&����	V���x���yuo-G&8->�xt�t������Rv��Y�4ZnT�4P]�HA�4�a�T�ǅ1`u\�,���hZ����S������o翿���{�릨ZRq��Y��fat�[����[z9��4�U�V��Anb$Kg������]������8�M0(WeU�H�\n_��¹�C�F�F�}����8d�N��.��]���u�,%Z�F-���E�'����q�L�\������=H�W'�L{�BP0Z���Y�̞���DE��I�N7���c��S���7�Xm�/`�	�+`����X_��KI��^��F\�aD�����~�+M����ㅤ��	SY��/�.�`���:�9Q�c �38K�j�0Y�D�8����W;ܲ�pTt��6P,� Nǵ��Æ�:(���&�N�/ X��i%�?�_P	�n�F�.^�G�E���鬫>?���"@v�2���A~�aԹ_[P, n��N������_rƢ��    IEND�B`�       ECFG	      _global_script_classes             _global_script_class_icons             application/config/name         zaisev_test    application/run/main_scene         res://main.tscn    application/config/icon         res://icon.png  $   rendering/quality/driver/driver_name         GLES2   %   rendering/vram_compression/import_etc         &   rendering/vram_compression/import_etc2          )   rendering/environment/default_environment          res://default_env.tres              